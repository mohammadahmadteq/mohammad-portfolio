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
			<div class="project-card">
				<div class="project-image">
					<Lightbox description={proj.name}>
						<img src={proj.imageUrl} alt={proj.name} width="100%" height="" />
					</Lightbox>
				</div>

				<span style="font-weight: 700">{proj.name}</span>
				<div>{proj.tech}</div>
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

		@media screen and (max-width: 576px) {
			flex-wrap: wrap;
			row-gap: 1rem;
		}
	}

	.project-card {
		border-radius: 0.5rem;
		border: 1px solid var(--color-primary-a10);
		padding: 1rem;
		flex-basis: 15%;
		background-color: white;
		transition:
			transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		filter: drop-shadow(10, 100, 100);
		box-shadow: 0.5rem 0.875rem 1.75rem -0.875rem rgba(0, 0, 0, 0.1);

		@media screen and (max-width: 576px) {
			flex-basis: 38%;
		}
	}

	.project-card:hover {
		transform: translateY(-1.25rem);
		box-shadow: 0.3125rem 2.25rem 2.25rem -0.6875rem rgba(0, 0, 0, 0.1);
	}
	.project-image {
		width: 100%;
	}
</style>
