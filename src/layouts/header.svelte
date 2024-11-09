<script>
	import Github from '@components/socialMediaIcons/github.svelte';
	import Instagram from '@components/socialMediaIcons/instagram.svelte';
	import Linkedin from '@components/socialMediaIcons/linkedin.svelte';
	import Xwitter from '@components/socialMediaIcons/xwitter.svelte';

	let email = 'mahmad2403@gmail.com';
	let subject = 'Hello! Lets chat about your Apllication!';
	const sendEmail = () => {
		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
		window.open(mailtoLink);
	};
</script>

<div class="header">
	<Github />
	<Instagram />
	<Linkedin />
	<button class="big-round-button" on:click={sendEmail}>Get in Touch!</button>
</div>

<style>
	.header {
		position: sticky;
		top: 0;

		column-gap: 0.625rem;

		justify-content: end;

		display: flex;
		align-items: center;

		padding: 0.5rem 1rem;

		z-index: 2;
	}
</style>
