<script>
	import JavascriptLogo from '@components/introLogos/javascriptLogo.svelte';
	import ReactLogo from '@components/introLogos/reactLogo.svelte';
	import RustLogo from '@components/introLogos/rustLogo.svelte';
	import SvelteLogo from '@components/introLogos/svelteLogo.svelte';
	import TypescriptLogo from '@components/introLogos/typescriptLogo.svelte';
	import NestjsLogo from '@components/introLogos/nestjsLogo.svelte';
	import NextjsLogo from '@components/introLogos/nextjsLogo.svelte';
	import PythonLogo from '@components/introLogos/pythoLogo.svelte';
	import NodejsLogo from '@components/introLogos/nodejsLogo.svelte';
	import BunLogo from '@components/introLogos/bunLogo.svelte';
	import { Tooltip } from '@svelte-plugins/tooltips';
</script>

<div class="intro-padding">
	<div class="intro-section">
		<div>
			<h1 class="remove-margin">Hello,</h1>
			<h2 class="remove-margin">I am Mohammad Ahmad!</h2>
			<h3 class="remove-margin">Software Engineer</h3>
		</div>
	</div>

	<p class="remove-margin">Top Skills:</p>

	<div class="logo-container">
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Javascript"
			><div class="logo"><JavascriptLogo /></div></Tooltip
		>
		<Tooltip
			style={{ backgroundColor: 'white', color: 'black' }}
			arrow={false}
			content="Typescript"
		>
			<div class="logo"><TypescriptLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="React">
			<div class="logo"><ReactLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Svelte">
			<div class="logo"><SvelteLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Rust">
			<div class="logo"><RustLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Nest.js">
			<div class="logo"><NestjsLogo /></div>
		</Tooltip>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Next.js"
			><div class="logo"><NextjsLogo /></div></Tooltip
		>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Python"
			><div class="logo"><PythonLogo /></div></Tooltip
		>
		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Nodejs">
			<div class="logo logo-node"><NodejsLogo /></div></Tooltip
		>

		<Tooltip style={{ backgroundColor: 'white', color: 'black' }} arrow={false} content="Bun">
			<div class="logo"><BunLogo /></div>
		</Tooltip>
	</div>
</div>

<style>
	.intro-padding {
		min-height: 495px;
	}
	.intro-section {
		display: flex;
		align-items: center;
	}

	.remove-margin {
		margin: 0px 0px;
	}

	.wave-picture {
		font-size: 20rem;
	}
	.logo-container {
		display: flex;
		width: 100%;
		column-gap: 0.75rem;
		margin-top: 1rem;
	}
	.logo {
		max-width: 3rem;
		min-width: 1.5rem;
		height: 3rem;
		transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	.logo-node {
		max-width: 7.3rem;
		height: 3rem;
	}
	.logo:hover {
		@media screen and (min-width: 577px) {
			max-width: 6rem;
			height: 6rem;
		}
	}
	.logo-node:hover {
		@media screen and (min-width: 577px) {
			max-width: 14.6rem;
			height: 6rem;
		}
	}
</style>
