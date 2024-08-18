<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import ExperienceSlide from '@components/aboutSlides/experienceSlide.svelte';
	import ProjectSlide from '@components/aboutSlides/projectSlide.svelte';
	import Modal from '@components/common/modal.svelte';

	let emblaApi: EmblaCarouselType;

	let options;
	function onInit(event: any) {
		emblaApi = event.detail;
	}

	let showModal = false;
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
<div class="carousal-container">
	<button class="embla__prev" on:click={() => emblaApi.scrollPrev()}>Prev</button>
	<div class="embla" use:emblaCarouselSvelte on:emblaInit={onInit}>
		<div class="embla__container">
			<div class="embla__slide"><ExperienceSlide /></div>
			<div class="embla__slide"><ProjectSlide /></div>
			<div class="embla__slide">Slide 3</div>
		</div>
	</div>
	<button class="embla__next" on:click={() => emblaApi.scrollNext()}>Next</button>
</div>

<style>
	.embla {
		overflow: hidden;
		width: 100%;
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
