<script lang="ts">
	import AboutSection from '@layouts/aboutSection.svelte';
	import IntroSection from '../layouts/introSection.svelte';
	import '@styles/globals.css';
	import BasketBallSection from '@layouts/basketBallSection.svelte';
	import Header from '@layouts/header.svelte';
	import { onMount } from 'svelte';

	// Parameters for square animation
	const squaresCount = 64;
	let squares: any[];

	// Function to create initial squares with random positions and delays
	function createSquares() {
		const new_squares = [];

		for (let i = 0; i < squaresCount; i++) {
			const size = getSquareSizeForBg() / 16;
			new_squares.push({
				top: Math.random() * 100, // Random vertical position
				delay: Math.random() * 5, // Random delay to stagger animations
				side: Math.random() > 0.5 ? 'left' : 'right', // Random side
				speed: 3 + Math.random() * 3, // Random speed for variation
				size: size
			});
		}

		squares = new_squares;
	}

	onMount(() => {
		createSquares();
	});

	const getSquareSizeForBg = () => {
		const number = Math.round(Math.random() * 30);
		console.log(number);
		const size = number > 32 ? 32 : number < 12 ? 12 : number;

		return size;
	};

	$: console.log(squares);
</script>

<Header />

<div class="section-flex">
	<div class="section">
		<IntroSection />
	</div>
</div>

<div class="section-flex">
	<div class="section about" style="margin-block: 2rem;">
		<AboutSection />
	</div>
</div>

<div class="section" style="margin-block: 2rem;" />
<BasketBallSection />

<!-- Squares rendering -->
<div class="animated-background">
	{#each squares ?? [] as square (square.top)}
		<div
			class="square {square.side}"
			style="
            top: {square.top}vh;
			width: {square.size}rem;
			height: {square.size}rem;
        	animation-duration: {square.speed}s;
            animation-delay: {square.delay}s;
        "
		></div>
	{/each}
</div>

<style>
	.section-flex {
		display: flex;
		justify-content: center;
		overflow-x: hidden;

		height: 95dvh;
		align-items: center;
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

	.about {
		@media screen and (max-width: 576px) {
			padding-inline: unset;
			max-width: unset;
		}
	}

	.square {
		position: absolute;
		background-color: var(--color-primary-a50);
		opacity: 1;
		animation-timing-function: linear;
		z-index: 0;
	}

	.animated-background {
		position: fixed;
		height: 100dvh;
		top: 0px;
		left: 0px;
		width: 100%;
		z-index: -1;
	}

	/* Left side animation */
	@keyframes moveFromLeft {
		0% {
			transform: translateX(0);
			opacity: 1;
		}
		32% {
			opacity: 0;
		}
		100% {
			transform: translateX(65vw);
			opacity: 0;
		}
	}

	/* Right side animation */
	@keyframes moveFromRight {
		0% {
			transform: translateX(0);
			opacity: 1;
		}
		32% {
			opacity: 0;
		}
		100% {
			transform: translateX(-65vw);
			opacity: 0;
		}
	}

	.left {
		animation: moveFromLeft linear infinite;
		left: -50px;
	}

	.right {
		animation: moveFromRight linear infinite;
		right: -50px;
	}
</style>
