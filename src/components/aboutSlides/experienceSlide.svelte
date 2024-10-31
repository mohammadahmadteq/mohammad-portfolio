<script lang="ts">
	import CarbonteqLogo from '@components/companyLogos/carbonteqLogo.svelte';
	import ExperienceTimeline from '@components/experienceTimeline.svelte';
	import RankIcon from '@components/RankIcon.svelte';
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
			year: 2023,
			id: '2'
		},
		{
			designation: ' Senior Software Engineer',
			company: CarbonteqLogo,
			year: 2024,
			id: '3'
		}
	];

	export let timeLineAnimation: any;
</script>

<div class="section-container">
	<h3>Experience</h3>
	<div class="space-div">
		<div class="time-line">
			<ExperienceTimeline bind:playAnimation={timeLineAnimation} myExperience={exprerience} />
		</div>
		<div class="rank-icon"><RankIcon /></div>
	</div>
</div>

<style>
	.section-container {
		padding-bottom: 2rem;
		padding-inline: 0.5rem;
	}
	.space-div {
		display: flex;
		justify-content: space-between;
	}
	.rank-icon {
		width: 100%;
		max-width: 18rem;
		transform: translateX(-10rem) rotate(25deg);
		height: 5rem;

		@media screen and (max-width: 1200px) {
			width: 100%;
			max-width: 18rem;
			transform: translateX(-5rem) rotate(25deg);
		}

		@media screen and (max-width: 769px) {
			width: 100%;
			max-width: 10rem;
			transform: rotate(25deg);
		}
	}

	.time-line {
		width: 800px;

		@media screen and (max-width: 1200px) {
			width: 650px;
		}

		@media screen and (max-width: 769px) {
			width: 650px;
		}

		@media screen and (max-width: 576px) {
			width: fit-content;
		}
	}
</style>
