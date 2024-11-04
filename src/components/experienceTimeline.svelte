<script lang="ts">
	import { timeline, type TimelineDefinition } from 'motion';
	import { onMount } from 'svelte';
	import { elasticInOut } from 'svelte/easing';
	export let myExperience;

	let timelineElement: Element;

	let experienceBinds: Element[] = [];

	let timelineMarginLeft = '0px';

	const getTimeLineLengthDesktop = (experienceFirst: Element, experienceLast: Element) => {
		const { left: firstLeft } = experienceFirst.getBoundingClientRect();
		const { left: lastLeft } = experienceLast.getBoundingClientRect();

		const length = lastLeft - firstLeft;

		return length;
	};

	const getTimeLineLengthMobile = (experienceFirst: Element, experienceLast: Element) => {
		const { top: firstTop } = experienceFirst.getBoundingClientRect();
		const { top: lastTop } = experienceLast.getBoundingClientRect();

		const length = lastTop - firstTop;

		return length;
	};

	const getTimeLineLength = (experienceFirst: Element, experienceLast: Element) => {
		if (isSmall) {
			return getTimeLineLengthMobile(experienceFirst, experienceLast);
		}
		return getTimeLineLengthDesktop(experienceFirst, experienceLast);
	};
	export const playAnimationDesktop = (isReset?: boolean) => {
		timelineMarginLeft = `${experienceBinds[0].getBoundingClientRect().width * 0.5}px`;

		const completeAnimation: TimelineDefinition = [
			[
				timelineElement,
				{
					width: 0
				},
				{
					duration: 0
				}
			]
		];

		if (isReset) {
			const reset: TimelineDefinition = [
				...experienceBinds.slice(1).map(exp => {
					return [
						exp,
						{
							width: '1rem',
							height: '1rem'
						},
						{
							duration: 0
						}
					] as any;
				}),
				[
					timelineElement,
					{
						width: 0
					},
					{
						duration: 0
					}
				]
			];

			timeline(reset);
			return;
		}

		for (const elem in experienceBinds) {
			if (elem === '0') {
				continue;
			}

			completeAnimation.push([
				timelineElement,
				{
					width: `${getTimeLineLength(experienceBinds[0], experienceBinds[elem])}px`
				},
				{
					duration: 1
				}
			]);
			completeAnimation.push([
				experienceBinds[elem],
				{
					width: '1.5rem',
					height: '1.5rem'
				},
				{
					duration: 1,
					easing: elasticInOut,
					at: '-0.55'
				}
			]);
		}

		timeline(completeAnimation);
	};

	export const playAnimationMobile = (isReset?: boolean) => {
		timelineMarginLeft = `${experienceBinds[0].getBoundingClientRect().top - timelineElement.getBoundingClientRect().top + experienceBinds[0].getBoundingClientRect().height * 0.3}px`;
		console.log(timelineMarginLeft);

		const completeAnimation: TimelineDefinition = [
			[
				timelineElement,
				{
					height: 0
				},
				{
					duration: 0
				}
			]
		];

		if (isReset) {
			const reset: TimelineDefinition = [
				...experienceBinds.slice(1).map(exp => {
					return [
						exp,
						{
							minWidth: '1rem',
							height: '1rem'
						},
						{
							duration: 0
						}
					] as any;
				}),
				[
					timelineElement,
					{
						height: 0
					},
					{
						duration: 0
					}
				]
			];

			timeline(reset);
			return;
		}

		for (const elem in experienceBinds) {
			if (elem === '0') {
				continue;
			}

			console.log(getTimeLineLength(experienceBinds[0], experienceBinds[elem]));

			completeAnimation.push([
				timelineElement,
				{
					height: `${getTimeLineLength(experienceBinds[0], experienceBinds[elem])}px`
				},
				{
					duration: 1
				}
			]);
			completeAnimation.push([
				experienceBinds[elem],
				{
					minWidth: '1.5rem',
					height: '1.5rem'
				},
				{
					duration: 1,
					easing: elasticInOut,
					at: '-0.55'
				}
			]);
		}

		timeline(completeAnimation);
	};

	let isSmall = false;

	export const playAnimation = (isReset?: boolean) => {
		if (isSmall) {
			playAnimationMobile(isReset);
			return;
		}

		playAnimationDesktop(isReset);
	};

	onMount(() => {
		isSmall = window.screen.width <= 576;
	});
</script>

{#if isSmall}
	<div class="mobile-flex">
		<div class="timeline-container" style="--timelineMarginLeft:{timelineMarginLeft}">
			<div bind:this={timelineElement} class="timeline-line"></div>
		</div>
		<div class="experience-text-container">
			{#each myExperience as experience, index (experience.id)}
				<div style="display: flex; gap: 1rem">
					<div
						class="experience-circle"
						style="min-width: {index === 0 ? '1.5rem' : '1rem'}; height:{index === 0
							? '1.5rem'
							: '1rem'}"
						bind:this={experienceBinds[index]}
					/>
					<div>
						<div style="max-width: 4.5rem">
							<svelte:component this={experience.company} />
						</div>
						<div style="margin-bottom: 0.25rem; ">{experience.designation}</div>

						<div style="margin-top: 0.25rem;">{experience.year}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>{/if}
{#if !isSmall}
	<div class="experience-text-container">
		{#each myExperience as experience, index (experience.id)}
			<div>
				<div style="max-width: 4.5rem">
					<svelte:component this={experience.company} />
				</div>
				<div style="margin-bottom: 0.25rem; ">{experience.designation}</div>
				<div
					class="experience-circle"
					style="width: {index === 0 ? '1.5rem' : '1rem'}; height:{index === 0 ? '1.5rem' : '1rem'}"
					bind:this={experienceBinds[index]}
				/>
				<div style="margin-top: 0.25rem;">{experience.year}</div>
			</div>
		{/each}
	</div>
	<div class="timeline-container" style="--timelineMarginLeft:{timelineMarginLeft}">
		<div bind:this={timelineElement} class="timeline-line"></div>
	</div>{/if}

<style>
	.mobile-flex {
		@media screen and (max-width: 576px) {
			display: flex;
		}
	}
	.timeline-container {
		padding-left: var(--timelineMarginLeft);

		@media screen and (max-width: 576px) {
			padding-left: 0;

			padding-top: var(--timelineMarginLeft);
		}
	}

	.experience-circle {
		border-radius: 100%;
		background-color: var(--color-primary-a70);
	}

	.experience-text-container {
		position: relative;
		top: 2.6rem;
		left: 0.5rem;
		display: flex;
		justify-content: left;
		gap: 3rem;

		@media screen and (max-width: 576px) {
			flex-direction: column;
			top: 0px;
			left: -1rem;
		}
	}

	.timeline-line {
		height: 0.5rem;
		width: 0px;
		background-color: var(--color-primary-a70);
		border-radius: 1rem;

		@media screen and (max-width: 576px) {
			height: 0px;
			width: 0.5rem;
		}
	}
</style>
