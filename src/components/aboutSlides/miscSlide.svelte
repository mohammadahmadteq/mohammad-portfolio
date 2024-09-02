<script>
	import MaterialsScience from '@components/miscIcons/materialsScience.svelte';
	import Paintbrush from '@components/miscIcons/paintbrush.svelte';
	import VrSystem from '@components/miscIcons/VRSystem.svelte';
</script>

<div class="misc-container">
	<h3>Also...</h3>

	<div class="misc-flex">
		<div>
			<div class="misc-bullets">I like science, especially solid state chemistry!</div>
			<div class="misc-bullets">I do digital art follow my instagram: @mamber2403</div>
		</div>

		<div class="misc-icons-container">
			<div class="logo-container" style=""><Paintbrush /></div>
			<div class="logo-container" style=" bottom:100px;"><MaterialsScience /></div>
			<div class="logo-container" style=""><VrSystem /></div>
		</div>
	</div>
</div>

<style>
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
	}

	.misc-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.misc-icons-container {
		display: flex;
		max-width: 30vw;
	}
</style>
