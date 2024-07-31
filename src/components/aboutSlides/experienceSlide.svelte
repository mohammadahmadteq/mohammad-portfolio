<script lang="ts">
	import CarbonteqLogo from '@components/companyLogos/carbonteqLogo.svelte';
	import ExperienceTimeline from '@components/experienceTimeline.svelte';
	const exprerience = [
		{
			designation: 'Associate Software Engineer',
			company: CarbonteqLogo,
			year: 2022,
			id: '1'
		},
		{
			designation: 'Software Engineer',
			company: CarbonteqLogo,
			year: 2024,
			id: '2'
		}
	];
</script>

<div class="section-container">
	\ <ExperienceTimeline myExperience={exprerience} />
</div>

<style>
	.section-container {
		padding-inline: 5rem;
		padding-bottom: 2rem;
	}
</style>
