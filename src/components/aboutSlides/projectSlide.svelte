<script>
	import { Lightbox } from 'svelte-lightbox';

	const projectsList = [
		{
			imageUrl: './assets/images/projects/FCH.png',
			name: 'First Class Healthcare',
			tech: 'Next + Express'
		},
		{
			imageUrl: './assets/images/projects/DTUCA.png',
			name: 'DriveThru Urgent Care Admin',
			tech: 'Next + Express'
		},
		{
			imageUrl: './assets/images/projects/DTUCP.png',
			name: 'DriveThru Urgent Care Patient',
			tech: 'Next + Express'
		},
		{
			imageUrl: './assets/images/projects/PT.png',
			name: 'Prospecting Tool',
			tech: 'React + Express'
		},
		{
			imageUrl: './assets/images/projects/Carbonteq.png',
			name: 'Carbonteq.com',
			tech: 'Webflow'
		}
	];
</script>

<div class="project-container">
	<h3>Projects</h3>

	<div class="project-flex">
		{#each projectsList as proj}
			<div class="project-card genie-card is-hoverable">
				<div class="project-image">
					<Lightbox description={proj.name}>
						<img src={proj.imageUrl} alt={proj.name} width="100%" height="" />
					</Lightbox>
				</div>

				<span class="project-name">{proj.name}</span>
				<div class="project-tech">{proj.tech}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.project-container {
		padding-inline: 0.5rem;
	}
	.project-flex {
		display: flex;
		justify-content: space-between;
		gap: 1rem;

		/* Mobile: switch to a 2-column grid so the layout is exact regardless of
		   image intrinsic sizes (flex-basis was getting stretched by the <img>). */
		@media screen and (max-width: 576px) {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}
	}

	.project-card {
		padding: 1rem;
		flex-basis: 15%;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		/* genie-card supplies the gradient, glow, hover lift — override only what's
		   project-specific (the size / radius scale for these small cards). */
		border-radius: 1rem;
	}

	.project-image {
		width: 100%;
		border-radius: 0.7rem;
		overflow: hidden;
	}

	.project-name {
		font-weight: 800;
		color: var(--color-primary-a80);
		font-size: 0.95rem;
		line-height: 1.2;
	}

	.project-tech {
		font-size: 0.78rem;
		color: var(--color-primary-a60);
	}
</style>
