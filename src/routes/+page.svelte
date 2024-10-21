<script>
	import AboutSection from '@layouts/aboutSection.svelte';
	import IntroSection from '../layouts/introSection.svelte';
	import '@styles/globals.css';
	import BasketBallSection from '@layouts/basketBallSection.svelte';
	import Header from '@layouts/header.svelte';
</script>

<Header />

<div class="section-flex">
	<div class="section">
		<IntroSection />
	</div>
</div>

<div class="section-flex">
	<div class="section" style="margin-block: 2rem;">
		<AboutSection />
	</div>
</div>

<div class="section" style="margin-block: 2rem;" />
<BasketBallSection />

<style>
	.section-flex {
		display: flex;
		justify-content: center;

		@media screen and (max-width: 576px) {
			display: block;
			justify-content: unset;
		}
	}
	.section {
		max-width: 1440px;
		width: 100%;
		padding-inline: 5rem;

		@media screen and (max-width: 576px) {
			padding-inline: 1.75rem;
			max-width: unset;
		}
	}
</style>
