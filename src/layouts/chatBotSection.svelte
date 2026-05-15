<script lang="ts">
	import { onMount, tick } from 'svelte';

	// WebGPU path (preferred): MediaPipe + Gemma 3 270M int4 (~238 MB).
	// Self-hosted on Cloudflare R2 because Google's Gemma weights are gated on HF/Kaggle.
	const WEBGPU_MODEL_URL =
		'https://pub-9a84063dacaa48c78db65d5df7eefe17.r2.dev/gemma3-270m-it-q4_0-web.task';
	const MEDIAPIPE_WASM_URL =
		'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.27/wasm';

	// CPU fallback (wllama/llama.cpp WASM): SmolLM2-360M-Instruct Q8_0 (~386 MB).
	// Tiny but coherent; usable at ~5-15 tok/s on a typical phone.
	const WASM_MODEL_URL =
		'https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct-GGUF/resolve/main/smollm2-360m-instruct-q8_0.gguf';
	const WLLAMA_WASM_URL =
		'https://cdn.jsdelivr.net/npm/@wllama/wllama@3.1.1/src/wasm/wllama.wasm';

	type Msg = { role: 'bot' | 'user' | 'system'; text: string; pending?: boolean };
	type Backend = 'webgpu' | 'wasm';

	const GENIE_SYSTEM_PROMPT =
		"You are Genie, a tiny sparkly genie who lives inside this browser tab. You are small, magical, and very enthusiastic. You speak warmly and playfully, use whimsical language, and occasionally mention your tiny lamp, granting wishes, or floating around. You're often wrong but always cheerful about it. Keep responses to 1-3 short sentences and never break character.";

	const INTRO_MESSAGE =
		"✨ Oh hi there! I'm Genie — a teeny magical creature living in this browser tab. I'm very small so my wisdom is, uh, limited, but I'd love to chat anyway! What's on your mind?";

	let messages: Msg[] = [{ role: 'bot', text: INTRO_MESSAGE }];

	let input = '';
	let status: 'idle' | 'loading' | 'ready' | 'generating' | 'error' = 'idle';
	let backend: Backend | null = null;
	let loadProgress = 0;
	let errorText = '';
	let mediapipeLlm: any = null;
	let wllamaLlm: any = null;
	let scrollArea: HTMLDivElement;
	let inputEl: HTMLTextAreaElement;
	// Probed once on mount. We default to false so the UI advertises the WASM
	// path until we confirm a real adapter exists — better to under-promise.
	let canUseWebGPU = false;

	async function probeWebGPU(): Promise<boolean> {
		// `'gpu' in navigator` is true on Android Chrome even when no adapter is
		// available, so we have to actually request one. requestAdapter() resolves
		// to null (not a throw) when the device isn't on Chrome's WebGPU allow-list.
		if (typeof navigator === 'undefined' || !('gpu' in navigator)) return false;
		try {
			const adapter = await (navigator as any).gpu.requestAdapter();
			return !!adapter;
		} catch {
			return false;
		}
	}

	async function scrollToBottom() {
		await tick();
		if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
	}

	async function loadModel() {
		if (status === 'loading' || status === 'ready') return;

		// Both backends need `crypto.subtle` (and the WASM path also needs OPFS),
		// which require a secure context. Browsers consider HTTPS and localhost
		// secure; LAN IPs over HTTP do not. Fail loud here instead of letting
		// a downstream library throw a cryptic "cannot read properties of undefined".
		if (typeof window !== 'undefined' && !window.isSecureContext) {
			status = 'error';
			errorText =
				'This demo needs a secure context (HTTPS or localhost). Open the deployed site, or access dev via http://localhost instead of a LAN IP.';
			return;
		}

		status = 'loading';
		errorText = '';
		loadProgress = 0;

		// Fake-but-honest progress ticker. Neither backend exposes a granular byte
		// callback through these APIs, so we crawl toward 90% then jump on completion.
		const progressTimer = setInterval(() => {
			if (loadProgress < 90) loadProgress += 1;
		}, 600);

		try {
			if (canUseWebGPU) {
				try {
					backend = 'webgpu';
					await loadWebGPU();
				} catch (gpuErr) {
					// Probe said yes but MediaPipe still couldn't init (e.g. adapter
					// exists but lacks a required feature). Drop down to WASM rather
					// than dead-ending in the error state.
					console.warn('WebGPU init failed, falling back to WASM', gpuErr);
					canUseWebGPU = false;
					backend = 'wasm';
					await loadWasm();
				}
			} else {
				backend = 'wasm';
				await loadWasm();
			}
			loadProgress = 100;
			status = 'ready';
		} catch (err: any) {
			console.error(err);
			status = 'error';
			errorText = err?.message ?? 'Failed to load model.';
		} finally {
			clearInterval(progressTimer);
		}
	}

	async function loadWebGPU() {
		const { FilesetResolver, LlmInference } = await import('@mediapipe/tasks-genai');
		const genai = await FilesetResolver.forGenAiTasks(MEDIAPIPE_WASM_URL);
		mediapipeLlm = await LlmInference.createFromOptions(genai, {
			baseOptions: { modelAssetPath: WEBGPU_MODEL_URL },
			maxTokens: 1024,
			topK: 40,
			temperature: 0.8,
			randomSeed: 42
		});
	}

	async function loadWasm() {
		const { Wllama } = await import('@wllama/wllama');
		// wllama uses OPFS (navigator.storage.getDirectory) to cache the GGUF.
		// OPFS is unavailable in insecure contexts (HTTP) and some browser modes,
		// so disable the cache when it's missing to avoid a "getDirectory of undefined" crash.
		const opfsAvailable =
			typeof navigator !== 'undefined' &&
			typeof navigator.storage?.getDirectory === 'function';
		wllamaLlm = new Wllama({ default: WLLAMA_WASM_URL });
		await wllamaLlm.loadModelFromUrl(WASM_MODEL_URL, {
			n_ctx: 1024,
			n_threads: Math.max(1, Math.min(4, navigator.hardwareConcurrency ?? 2)),
			useCache: opfsAvailable
		});
	}

	async function send() {
		const text = input.trim();
		if (!text || status === 'generating') return;
		if (status !== 'ready') {
			await loadModel();
			if ((status as string) !== 'ready') return;
		}

		messages = [...messages, { role: 'user', text }];
		input = '';
		await scrollToBottom();

		const replyIndex = messages.length;
		messages = [...messages, { role: 'bot', text: '', pending: true }];
		status = 'generating';

		try {
			if (backend === 'webgpu') {
				await generateWebGPU(text, replyIndex);
			} else {
				await generateWasm(text, replyIndex);
			}
		} catch (err: any) {
			console.error(err);
			messages[replyIndex].text = `(${err?.message ?? 'generation failed'})`;
			messages[replyIndex].pending = false;
			messages = messages;
			status = 'ready';
		}
	}

	function generateWebGPU(text: string, replyIndex: number) {
		// Gemma instruction-tuned models expect prompts wrapped in their chat
		// template. MediaPipe's LLM Inference API does NOT auto-apply this — feeding
		// raw text produces gibberish because the model never sees its turn tokens.
		// Gemma doesn't have a dedicated system role, so the persona is injected
		// at the top of the first user turn.
		const prompt =
			`<start_of_turn>user\n${GENIE_SYSTEM_PROMPT}\n\n${text}<end_of_turn>\n` +
			`<start_of_turn>model\n`;

		return new Promise<void>((resolve) => {
			mediapipeLlm.generateResponse(prompt, (partial: string, done: boolean) => {
				messages[replyIndex].text += partial;
				messages = messages;
				scrollToBottom();
				if (done) {
					messages[replyIndex].pending = false;
					messages = messages;
					status = 'ready';
					resolve();
				}
			});
		});
	}

	async function generateWasm(text: string, replyIndex: number) {
		// Keep a short rolling history so the WASM model has some context without
		// blowing past n_ctx. We skip the intro disclaimer and skip the pending bubble.
		const history = messages
			.slice(0, replyIndex)
			.filter((m, idx) => idx !== 0 && m.role !== 'system')
			.map((m) => ({
				role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
				content: m.text
			}));

		const stream = await wllamaLlm.createChatCompletion({
			messages: [
				{ role: 'system' as const, content: GENIE_SYSTEM_PROMPT },
				...history
			],
			stream: true,
			max_tokens: 256,
			temperature: 0.8,
			top_k: 40
		});

		for await (const chunk of stream) {
			const piece = chunk?.choices?.[0]?.delta?.content;
			if (piece) {
				messages[replyIndex].text += piece;
				messages = messages;
				scrollToBottom();
			}
		}
		messages[replyIndex].pending = false;
		messages = messages;
		status = 'ready';
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}

	function autoSize() {
		if (!inputEl) return;
		inputEl.style.height = 'auto';
		inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
	}

	onMount(async () => {
		scrollToBottom();
		canUseWebGPU = await probeWebGPU();
	});
</script>

<div class="chatbot-wrap">
	<div class="chatbot-card genie-card">
		<header class="chatbot-header">
			<div class="avatar">
				<span class="avatar-dot"></span>
				<span class="avatar-dot"></span>
			</div>
			<div class="title-block">
				<h3 class="title">genie ✨</h3>
				<span class="subtitle">
					{#if status === 'ready'}
						<span class="status-dot ok"></span>
						{backend === 'wasm' ? 'smollm · cpu' : 'gemma · webgpu'} · ready
					{:else if status === 'generating'}
						<span class="status-dot ok"></span> thinking…
					{:else if status === 'loading'}
						<span class="status-dot warn"></span> waking up · {loadProgress}%
					{:else if status === 'error'}
						<span class="status-dot err"></span> offline
					{:else}
						<span class="status-dot"></span> sleeping · poke to wake
					{/if}
				</span>
			</div>
		</header>

		<div class="messages" bind:this={scrollArea}>
			{#each messages as msg, i (i)}
				<div class="msg {msg.role}">
					<div class="bubble">
						{msg.text}
						{#if msg.pending}<span class="caret">▍</span>{/if}
					</div>
				</div>
			{/each}

			{#if status === 'idle'}
				<div class="wake-cta">
					<button class="wake-btn" on:click={loadModel}>
						<span>Wake me up</span>
						<small>
							{canUseWebGPU
								? '~238 MB · gemma on webgpu'
								: '~386 MB · smollm on cpu (slower)'}
						</small>
					</button>
				</div>
			{/if}

			{#if status === 'loading'}
				<div class="loader-row">
					<div class="bar"><div class="fill" style="width: {loadProgress}%"></div></div>
				</div>
			{/if}

			{#if status === 'error'}
				<div class="error-row">
					{errorText}
					<button class="retry" on:click={loadModel}>retry</button>
				</div>
			{/if}
		</div>

		<form
			class="composer"
			on:submit|preventDefault={send}
			class:disabled={status === 'loading' || status === 'error'}
		>
			<textarea
				bind:this={inputEl}
				bind:value={input}
				on:keydown={onKey}
				on:input={autoSize}
				placeholder={status === 'ready' || status === 'generating'
					? 'say something…'
					: 'press send to wake the model'}
				rows="1"
				disabled={status === 'loading' || status === 'error'}
			></textarea>
			<button
				type="submit"
				class="send"
				aria-label="Send"
				disabled={status === 'loading' || status === 'error' || status === 'generating'}
			>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
					stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14M13 5l7 7-7 7" />
				</svg>
			</button>
		</form>
	</div>
</div>

<style>
	.chatbot-wrap {
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
		position: relative;
	}

	.chatbot-card {
		width: 100%;
		max-width: 28rem;
		display: flex;
		flex-direction: column;
		min-height: 28rem;
		max-height: 36rem;
	}

	.chatbot-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.9rem 1.1rem;
		border-bottom: 1px solid rgba(109, 114, 176, 0.15);
	}

	.avatar {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: linear-gradient(135deg, #bd6381, #6d72b0);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.18rem;
		box-shadow: 0 4px 14px rgba(189, 99, 129, 0.45);
	}
	.avatar-dot {
		width: 0.32rem;
		height: 0.32rem;
		background: white;
		border-radius: 50%;
		animation: blink 2.6s infinite;
	}
	.avatar-dot:last-child {
		animation-delay: 0.25s;
	}
	@keyframes blink {
		0%, 90%, 100% { transform: scaleY(1); }
		95% { transform: scaleY(0.1); }
	}

	.title-block { display: flex; flex-direction: column; line-height: 1.1; }
	.title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		color: var(--color-primary-a80);
	}
	.subtitle {
		font-size: 0.72rem;
		color: var(--color-primary-a60);
		display: flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.2rem;
	}
	.status-dot {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		background: #b9b9c8;
	}
	.status-dot.ok { background: #5ec07a; box-shadow: 0 0 8px #5ec07a99; }
	.status-dot.warn { background: #e3a23a; }
	.status-dot.err { background: #d4625e; }

	.messages {
		flex: 1;
		padding: 1rem 1rem 0.5rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		scrollbar-width: thin;
	}

	.msg { display: flex; }
	.msg.bot { justify-content: flex-start; }
	.msg.user { justify-content: flex-end; }

	.bubble {
		max-width: 82%;
		padding: 0.6rem 0.85rem;
		border-radius: 1.1rem;
		font-size: 0.92rem;
		line-height: 1.45;
		white-space: pre-wrap;
		word-wrap: break-word;
		animation: pop 220ms ease-out;
	}
	.msg.bot .bubble {
		background: rgba(255, 255, 255, 0.85);
		color: var(--color-primary-a90);
		border: 1px solid rgba(109, 114, 176, 0.15);
		border-bottom-left-radius: 0.35rem;
	}
	.msg.user .bubble {
		background: linear-gradient(135deg, #bd6381, #8a5fa5);
		color: white;
		border-bottom-right-radius: 0.35rem;
		box-shadow: 0 6px 14px -6px rgba(189, 99, 129, 0.55);
	}

	@keyframes pop {
		from { opacity: 0; transform: translateY(6px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.caret {
		display: inline-block;
		margin-left: 2px;
		animation: caret 0.9s steps(1) infinite;
		opacity: 0.7;
	}
	@keyframes caret {
		50% { opacity: 0; }
	}

	.wake-cta {
		display: flex;
		justify-content: center;
		padding: 0.6rem 0;
	}
	.wake-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		padding: 0.8rem 1.4rem;
		border: none;
		border-radius: 1rem;
		background: linear-gradient(135deg, #6d72b0, #424466);
		color: white;
		cursor: pointer;
		font-weight: 700;
		transition: transform 150ms ease, box-shadow 150ms ease;
		box-shadow: 0 10px 25px -10px rgba(66, 68, 102, 0.7);
	}
	.wake-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(66, 68, 102, 0.85); }
	.wake-btn small { font-weight: 500; font-size: 0.7rem; opacity: 0.85; }

	.loader-row { padding: 0.5rem 0.2rem 0; }
	.bar {
		width: 100%;
		height: 4px;
		background: rgba(109, 114, 176, 0.2);
		border-radius: 2px;
		overflow: hidden;
	}
	.fill {
		height: 100%;
		background: linear-gradient(90deg, #bd6381, #6d72b0);
		transition: width 220ms ease;
	}

	.error-row {
		font-size: 0.8rem;
		color: #a14743;
		background: rgba(212, 98, 94, 0.1);
		border: 1px solid rgba(212, 98, 94, 0.25);
		padding: 0.5rem 0.7rem;
		border-radius: 0.6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}
	.retry {
		border: none;
		background: #d4625e;
		color: white;
		padding: 0.25rem 0.6rem;
		border-radius: 0.4rem;
		font-size: 0.72rem;
		cursor: pointer;
	}

	.composer {
		display: flex;
		gap: 0.5rem;
		align-items: flex-end;
		padding: 0.7rem 0.8rem 0.9rem;
		border-top: 1px solid rgba(109, 114, 176, 0.15);
	}
	.composer.disabled { opacity: 0.6; }

	textarea {
		flex: 1;
		resize: none;
		border: 1px solid rgba(109, 114, 176, 0.25);
		background: rgba(255, 255, 255, 0.9);
		border-radius: 0.9rem;
		padding: 0.55rem 0.8rem;
		font-family: inherit;
		font-size: 0.92rem;
		color: var(--color-primary-a90);
		outline: none;
		max-height: 7.5rem;
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}
	textarea:focus {
		border-color: #bd6381;
		box-shadow: 0 0 0 3px rgba(189, 99, 129, 0.18);
	}

	.send {
		width: 2.5rem;
		height: 2.5rem;
		border: none;
		border-radius: 50%;
		background: linear-gradient(135deg, #bd6381, #6d72b0);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6px 14px -6px rgba(189, 99, 129, 0.55);
		transition: transform 150ms ease, box-shadow 150ms ease;
		flex-shrink: 0;
	}
	.send:hover:not(:disabled) { transform: translateY(-1px) scale(1.04); }
	.send:disabled { opacity: 0.5; cursor: not-allowed; }

	@media screen and (max-width: 576px) {
		.chatbot-wrap { padding: 2rem 1rem; }
		.chatbot-card {
			max-width: 100%;
			min-height: 26rem;
			max-height: 32rem;
			border-radius: 1.25rem;
		}
		.title { font-size: 1rem; }
		.bubble { font-size: 0.88rem; }
	}
</style>
