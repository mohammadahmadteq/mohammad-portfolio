<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import ExperienceSlide from '@components/aboutSlides/experienceSlide.svelte';
	import ProjectSlide from '@components/aboutSlides/projectSlide.svelte';
	import Modal from '@components/common/modal.svelte';
	import MiscSlide from '@components/aboutSlides/miscSlide.svelte';
	import { timeline } from 'motion';

	let emblaApi: EmblaCarouselType;

	let options;

	function playAnimation(emblaApi: EmblaCarouselType) {
		timeLineAnimation(emblaApi.slidesInView().join('') !== '12');
	}
	const onInit = (event: any) => {
		emblaApi = event.detail;
		emblaApi.on('slidesInView', playAnimation);
	};

	let showModal = false;

	let timeLineAnimation: any;
</script>

<Modal bind:showModal>
	<iframe class="resume-content" title="Resume" src="src/assets/Ashraf_Abdullah_20240722190645.pdf">
	</iframe>
</Modal>

<button
	class="resume-button"
	on:click={() => {
		showModal = true;
	}}
>
	View Resume
</button>

<button
	class="resume-button"
	on:click={() => {
		timeLineAnimation();
	}}
>
	play animation
</button>
<div class="carousal-container">
	<button class="embla__prev" on:click={() => emblaApi.scrollPrev()}>Prev</button>
	<div class="embla" use:emblaCarouselSvelte on:emblaInit={onInit}>
		<div class="embla__container">
			<div class="embla__slide"><ProjectSlide /></div>
			<div class="embla__slide"><ExperienceSlide bind:timeLineAnimation /></div>
			<div class="embla__slide"><MiscSlide /></div>
		</div>
	</div>
	<button class="embla__next" on:click={() => emblaApi.scrollNext()}>Next</button>
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
		min-width: 0;
	}

	.carousal-container {
		display: flex;
		align-items: center;
	}

	.resume-content {
		width: 80rem;
		height: 50rem;
	}
</style>
