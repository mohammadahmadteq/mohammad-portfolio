<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import ExperienceSlide from '@components/aboutSlides/experienceSlide.svelte';
	import ProjectSlide from '@components/aboutSlides/projectSlide.svelte';
	import Modal from '@components/common/modal.svelte';
	import MiscSlide from '@components/aboutSlides/miscSlide.svelte';

	let emblaApi: EmblaCarouselType;
	let emblaScreens: number[] = [];
	let onScreen = 0;

	function playAnimation(emblaApi: EmblaCarouselType) {
		timeLineAnimation(emblaApi.slidesInView().join('') !== '1');

		onScreen = emblaApi.slidesInView()[0];
	}
	const onInit = (event: any) => {
		emblaApi = event.detail;
		emblaApi.on('slidesInView', playAnimation);
		emblaScreens = emblaApi.scrollSnapList();
	};

	let showModal = false;

	let timeLineAnimation: any;
	let buttonElementLeft: Element;
</script>

<Modal bind:showModal>
	<iframe class="resume-content" title="Resume" src="src/assets/Ashraf_Abdullah_20240722190645.pdf">
	</iframe>
</Modal>

<div style="width: 100%">
	<button
		class="big-round-button resume-button"
		on:click={() => {
			showModal = true;
		}}
	>
		View Resume
	</button>
	<div class="carousal-container">
		<button
			class="button-style button-left"
			on:click={() => {
				emblaApi.scrollPrev();

				if (onScreen > 0) {
					onScreen--;
				}
			}}
			bind:this={buttonElementLeft}>{'<'}</button
		>
		<div class="embla" use:emblaCarouselSvelte on:emblaInit={onInit}>
			<div class="embla__container">
				<div class="embla__slide"><ProjectSlide /></div>
				<div class="embla__slide"><ExperienceSlide bind:timeLineAnimation /></div>
				<div class="embla__slide"><MiscSlide /></div>
			</div>
		</div>
		<button
			class="button-style button-right"
			on:click={() => {
				emblaApi.scrollNext();

				if (onScreen < 2) {
					onScreen++;
				}
			}}>{'>'}</button
		>
	</div>
	<div class="dot-button-container">
		{#each emblaScreens as screen, index}
			<button
				class="dot-button {index === onScreen ? 'dot-button-selected' : ''}"
				on:click={() => {
					if (index !== onScreen) {
						emblaApi.scrollTo(index);
					}
				}}
			/>
		{/each}
	</div>
</div>

<style>
	.embla {
		overflow: hidden;
		width: 100%;
		min-height: 25rem;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 100%;
		margin-inline: 5px;
	}

	.carousal-container {
		display: flex;
		align-items: center;
	}

	.resume-content {
		width: 80rem;
		height: 50rem;

		@media screen and (max-width: 576px) {
			width: 100dvw;
			height: 100dvh;
		}
	}

	.button-style {
		position: relative;
		height: 21rem;
		border: none;
		background-color: unset;
		font-size: 4rem;
		cursor: pointer;
		width: 3rem;
		padding-inline: 0px;
		opacity: 0;
		z-index: 1;
		transition:
			opacity 350ms linear,
			padding 100ms linear;
	}

	.button-left {
		left: -1.5rem;

		transition:
			left 100ms linear,
			opacity 350ms linear,
			padding 100ms linear;
	}

	.button-left:hover {
		left: -1rem;
		opacity: 1;
	}

	.button-right:hover {
		right: -1rem;
		opacity: 1;
	}

	.button-right {
		right: -1.5rem;
		transition:
			right 100ms linear,
			opacity 350ms linear,
			padding 100ms linear;
	}

	.dot-button {
		border: 2px solid black;
		border-radius: 100%;
		cursor: pointer;
		background-color: nones;
		aspect-ratio: 1;
		opacity: 1;
	}

	.dot-button-selected {
		background-color: black;
	}

	.dot-button-container {
		position: relative;
		top: -2rem;
		width: 100%;
		column-gap: 0.25rem;
		display: flex;
		justify-content: center;

		@media screen and (max-width: 576px) {
			top: 1rem;
		}
	}

	.resume-button {
	}
</style>
