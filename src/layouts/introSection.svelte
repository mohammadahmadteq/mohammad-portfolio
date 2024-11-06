<script lang="ts">
	import JavascriptLogo from '@components/introLogos/javascriptLogo.svelte';
	import ReactLogo from '@components/introLogos/reactLogo.svelte';
	import RustLogo from '@components/introLogos/rustLogo.svelte';
	import SvelteLogo from '@components/introLogos/svelteLogo.svelte';
	import TypescriptLogo from '@components/introLogos/typescriptLogo.svelte';
	import NestjsLogo from '@components/introLogos/nestjsLogo.svelte';
	import NextjsLogo from '@components/introLogos/nextjsLogo.svelte';
	import PythonLogo from '@components/introLogos/pythoLogo.svelte';
	import NodejsLogo from '@components/introLogos/nodejsLogo.svelte';
	import BunLogo from '@components/introLogos/bunLogo.svelte';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import Amby from '@components/Amby.svelte';

	import { onMount } from 'svelte';
	import AmbySmile from '@components/AmbySmile.svelte';

	// Define reactive properties for mouse position
	let mouseX = 0;
	let mouseY = 0;

	let leftEyePosition = { x: 0, y: 0 };
	let rightEyePosition = { x: 0, y: 0 };

	let leftEye: HTMLDivElement;
	let rightEye: HTMLDivElement;

	// Function to update mouse position
	const handleMouseMove = (event: { clientX: number; clientY: number }) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	// Listen for mousemove event
	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	// Calculate the pupil position based on the cursor location
	function getPupilTransform(eye: HTMLDivElement, mouseX: number, mouseY: number) {
		if (eye) {
			const rect = eye.getBoundingClientRect();
			const eyeCenterX = rect.left + rect.width / 2;
			const eyeCenterY = rect.top + rect.height / 2;

			// Calculate the distance from the mouse to the eye center
			const distanceX = mouseX - eyeCenterX;
			const distanceY = mouseY - eyeCenterY;
			const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

			// Set the max radius for pupil movement based on distance
			const maxRadius = rect.width / 3; // The pupil can move to the edge of the eye
			const normalizedDistance = Math.min(distance / 100, 1); // Normalize distance to a range [0, 1]

			// Calculate pupil position
			const pupilX = (distanceX / distance) * maxRadius * normalizedDistance;
			const pupilY = (distanceY / distance) * maxRadius * normalizedDistance;

			return `translate(${pupilX}px, ${pupilY}px)`;
		}
	}

	let leftTransform: any = '';
	let rightTransform: any = '';

	let isClicked = false;

	$: leftTransform = getPupilTransform(leftEye, mouseX, mouseY);
	$: rightTransform = getPupilTransform(rightEye, mouseX, mouseY);
</script>

<div class="intro-padding">
	<div class="intro-section">
		<div>
			<h1 class="remove-margin">Hello,</h1>
			<h2 class="remove-margin">I am Mohammad Ahmad!</h2>
			<h3 class="remove-margin">Software Engineer</h3>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="char-container"
			on:mousedown={() => {
				isClicked = true;
			}}
			on:mouseup={() => {
				isClicked = false;
			}}
		>
			{#if !isClicked}
				<div class="eye-container">
					<div class="eye" bind:this={leftEye}>
						<div class="pupil" style="transform: {leftTransform}"></div>
					</div>
					<div class="eye" bind:this={rightEye}>
						<div class="pupil" style="transform: {rightTransform}"></div>
					</div>
				</div>{/if}

			{#if !isClicked}
				<Amby />
			{/if}
			{#if isClicked}
				<AmbySmile />
			{/if}
		</div>
	</div>

	<p class="remove-margin">Top Skills:</p>

	<div class="logo-container">
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Javascript"
			><div class="logo"><JavascriptLogo /></div></Tooltip
		>
		<Tooltip
			style={{ backgroundColor: 'white', color: 'black' }}
			arrow={false}
			content="Typescript"
		>
			<div class="logo"><TypescriptLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="React">
			<div class="logo"><ReactLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Svelte">
			<div class="logo"><SvelteLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Rust">
			<div class="logo"><RustLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Nest.js">
			<div class="logo"><NestjsLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Next.js"
			><div class="logo"><NextjsLogo /></div></Tooltip
		>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Python"
			><div class="logo"><PythonLogo /></div></Tooltip
		>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Nodejs">
			<div class="logo logo-node"><NodejsLogo /></div></Tooltip
		>

		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Bun">
			<div class="logo"><BunLogo /></div>
		</Tooltip>
	</div>
</div>

<style>
	.intro-padding {
		min-height: 495px;
	}
	.intro-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.remove-margin {
		margin: 0px 0px;
	}

	.char-container {
		flex-shrink: 0;
		flex-grow: 0;
		width: 40rem;
	}
	.logo-container {
		display: flex;
		width: 100%;
		column-gap: 0.75rem;
		margin-top: 1rem;
	}
	.logo {
		max-width: 3rem;
		min-width: 1.5rem;
		height: 3rem;
		transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	.logo-node {
		max-width: 7.3rem;
		height: 3rem;
	}
	.logo:hover {
		@media screen and (min-width: 577px) {
			max-width: 6rem;
			height: 6rem;
		}
	}
	.logo-node:hover {
		@media screen and (min-width: 577px) {
			max-width: 14.6rem;
			height: 6rem;
		}
	}

	.eye-container {
		display: flex;
		gap: 3.5rem;
		position: relative;
		top: 350px;
		left: 220px;
		margin-top: -70px;
	}

	.eye {
		width: 4rem;
		height: 4rem;
		background-color: transparent;
		border: 0.2rem solid var(--color-primary-a70);
		border-radius: 50%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.pupil {
		width: 2.5rem;
		height: 2.5rem;
		background-color: var(--color-primary-a70);
		border-radius: 50%;
		position: absolute;
	}
</style>
