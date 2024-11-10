<script lang="ts">
	import AboutSection from '@layouts/aboutSection.svelte';
	import IntroSection from '../layouts/introSection.svelte';
	import '@styles/globals.css';
	import BasketBallSection from '@layouts/basketBallSection.svelte';
	import Header from '@layouts/header.svelte';
	import { onMount } from 'svelte';

	const squaresCount = 64;
	let squares: { top: number; delay: number; side: string; speed: number; size: number }[];

	let fontSize: number;
	let prevScreenWidth: number;
	function createSquares() {
		const new_squares = [];

		for (let i = 0; i < squaresCount; i++) {
			const size = getSquareSizeForBg() / 16;
			new_squares.push({
				top: Math.random() * 100,
				delay: Math.random() * 5,
				side: Math.random() > 0.5 ? 'left' : 'right',
				speed: 3 + Math.random() * 3,
				size: size
			});
		}

		squares = new_squares;
	}

	onMount(() => {
		window.scrollTo(0, 0);

		createSquares();

		setBodyFontSize();
	});

	const getSquareSizeForBg = () => {
		const number = Math.round(Math.random() * 30);
		const size = number > 32 ? 32 : number < 12 ? 12 : number;

		return size;
	};

	const setBodyFontSize = () => {
		if (window.screen.width >= 3840) {
			fontSize = 40;
			document.documentElement.style.fontSize = '40px';
			return;
		}
		if (window.screen.width >= 2560) {
			fontSize = 20;
			document.documentElement.style.fontSize = '20px';
			return;
		}
		if (window.screen.width >= 1440) {
			fontSize = 16;
			document.documentElement.style.fontSize = '16px';
			return;
		}

		if (window.screen.width <= 400) {
			fontSize = 14;
			document.documentElement.style.fontSize = '14px';
			return;
		}

		if (window.screen.width <= 576) {
			fontSize = 16;
			document.documentElement.style.fontSize = '16px';
			return;
		}

		if (window.screen.width <= 1440) {
			fontSize = 10;
			document.documentElement.style.fontSize = '10px';
			return;
		}
	};

	let scrollBasket: Element;

	onMount(() => {
		setBodyFontSize();
	});
</script>

<Header />

<svelte:window on:resize={setBodyFontSize} />

<div class="section-flex">
	<div class="section">
		<button
			class="hoops-button"
			on:click={() => {
				scrollBasket.scrollIntoView({ behavior: 'smooth' });
			}}>Try Hoops!</button
		>

		<IntroSection />
	</div>
</div>

<div class="section-flex">
	<div class="section about" style="margin-block: 2rem;">
		<AboutSection />
	</div>
</div>

<div class="section" bind:this={scrollBasket} style="margin-block: 2rem;" />
<BasketBallSection {fontSize} />

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

		min-height: 95dvh;
		align-items: center;
		@media screen and (max-width: 576px) {
			display: block;
			justify-content: unset;
			min-height: unset;
		}
	}
	.section {
		max-width: 90rem;
		width: 100%;
		padding-inline: 5rem;

		@media screen and (max-width: 576px) {
			padding-inline: 1.75rem;
			width: unset;

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

	.hoops-button {
		background-color: #bd6381;
		color: var(--color-primary-a0);
		border: none;
		padding: 0.8rem 1.5rem;
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 0, 5rem;
		transition: all 0.3s ease;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
		outline: none;
		display: inline-block;
		animation: pulse 1.5s infinite;
	}

	.hoops-button:hover {
		background-color: #ac5776;
		color: var(--color-primary-a10);
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}
</style>
