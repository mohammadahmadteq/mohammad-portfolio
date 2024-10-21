<script>
	import MaterialsScience from '@components/miscIcons/materialsScience.svelte';
	import Paintbrush from '@components/miscIcons/paintbrush.svelte';
	import VrSystem from '@components/miscIcons/VRSystem.svelte';
</script>

<div class="misc-container">
	<h3 class="misc-heading">Also...</h3>

	<div class="misc-flex">
		<div>
			<div class="misc-bullets">I like science, especially solid state chemistry!</div>
			<div class="misc-bullets">I do digital art follow my instagram: @mamber2403</div>
		</div>

		<div class="misc-icons-container">
			<div class="logo-container" style=""><Paintbrush /></div>
			<div class="logo-container l2" style=";"><MaterialsScience /></div>
			<div class="logo-container l3" style=""><VrSystem /></div>
		</div>
	</div>
</div>

<style>
	.misc-heading {
		margin-bottom: 0.5rem;
	}
	.misc-container {
		padding-inline: 0.5rem;
	}
	.misc-bullets {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0.3rem 0rem;
	}

	.logo-container {
		position: relative;
		animation: float 6s ease-in-out infinite;
	}

	.l2 {
		animation-delay: 1s;

		bottom: 7rem;

		@media screen and (max-width: 576px) {
			bottom: 0rem;
		}
	}
	.l3 {
		animation-delay: 2s;
	}

	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(1.5rem);
		}
		100% {
			transform: translateY(0);
		}
	}

	.misc-flex {
		display: flex;
		justify-content: space-between;

		@media screen and (max-width: 576px) {
			flex-direction: column;
		}
	}

	.misc-icons-container {
		display: flex;
		max-width: 42dvw;

		@media screen and (max-width: 576px) {
			display: flex;
			max-width: 80vw;
			margin-top: 2rem;
		}
	}
</style>
