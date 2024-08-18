<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog class="modal-body" bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="modal-header">
		<button class="modal-close" on:click={() => dialog.close()}>x</button>
	</div>
	<slot />
</dialog>

<style>
	.modal-body {
		min-width: 10rem;
		min-height: 10rem;
		background-color: white;
		border-radius: 0.5rem;
		padding: 0.5rem;
		border: unset;
	}

	.modal-body:focus-visible {
		outline: unset;
	}

	.modal-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		cursor: pointer;
		margin-left: auto;
		font-size: 1.5rem;
		transition: background linear 100ms;
		border-radius: 100%;
		padding-bottom: 0.2rem;
		outline: unset;
		border: unset;
		background: unset;
	}

	.modal-close:hover {
		transition: background linear 100ms;
		background: rgba(128, 128, 128, 0.295);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
