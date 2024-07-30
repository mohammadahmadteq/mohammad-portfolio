<script lang="ts">
	import { animate } from 'motion';
	import { onMount } from 'svelte';
	import { elasticInOut, elasticOut } from 'svelte/easing';
	const myExperience = [
		{
			designation: 'Associate Software Engineer',
			company: 'Carbonteq',
			year: 2022,
			id: '1'
		},
		{
			designation: 'Software Engineer',
			company: 'Carbonteq',
			year: 2023,
			id: '2'
		}
	];

	let timelineElement: Element;

	let experienceBinds: Element[] = [];

	let timelineMarginLeft = '0px';

	const getTimeLineLength = (experienceBindings: Element[]) => {
		const { left: firstLeft } = experienceBindings[0].getBoundingClientRect();
		const { left: lastLeft } =
			experienceBindings[experienceBindings.length - 1].getBoundingClientRect();

		const length = lastLeft - firstLeft;

		return length;
	};
	onMount(() => {
		timelineMarginLeft = `${experienceBinds[0].getBoundingClientRect().width * 0.5}px`;
		experienceBinds.map(elem => console.log(elem.getBoundingClientRect()));

		animate(
			timelineElement,
			{
				width: `${getTimeLineLength(experienceBinds)}px`
			},
			{ duration: 2, easing: 'ease-in-out' }
		);
	});
</script>

<div class="section-container">
	<h3>Work History</h3>

	<div class="experience-text-container">
		{#each myExperience as experience, index (experience.id)}
			<div
				class="experience-circle"
				style="margin-left: {experience.id === '2' ? '200px' : 0}"
				bind:this={experienceBinds[index]}
			></div>
		{/each}
	</div>

	<div class="timeline-container" style="--timelineMarginLeft:{timelineMarginLeft}">
		<div bind:this={timelineElement} class="timeline-line"></div>
	</div>
</div>

<style>
	.section-container {
		padding-inline: 5rem;
	}
	.timeline-container {
		padding-left: var(--timelineMarginLeft);
	}

	.experience-circle {
		border-radius: 100%;
		background-color: grey;
		width: 1rem;
		height: 1rem;
	}

	.experience-text-container {
		display: flex;
		justify-content: left;
	}

	.timeline-line {
		height: 0.5rem;
		width: 0px;
		background-color: var(--color-text);
		border-radius: 1rem;
		max-width: 100%;
	}
</style>
