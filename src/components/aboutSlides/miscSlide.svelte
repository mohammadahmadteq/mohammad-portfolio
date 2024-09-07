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
			<div class="logo-container l2" style=" bottom:7rem;"><MaterialsScience /></div>
			<div class="logo-container l3" style=""><VrSystem /></div>
		</div>
	</div>
</div>

<style>
	.misc-heading {
		margin-bottom: 0.5rem;
	}
	.misc-container {
		padding: 0rem 5rem;
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
	}

	.misc-icons-container {
		display: flex;
		max-width: 45vw;
	}
</style>
