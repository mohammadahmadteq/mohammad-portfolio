<script>
	import Github from '@components/socialMediaIcons/github.svelte';
	import Instagram from '@components/socialMediaIcons/instagram.svelte';
	import Linkedin from '@components/socialMediaIcons/linkedin.svelte';
	import Xwitter from '@components/socialMediaIcons/xwitter.svelte';
</script>

<div class="header">
	<Github />
	<Instagram />
	<Linkedin />
	<Xwitter />
	<button class="big-round-button">Get in Touch!</button>
</div>

<style>
	.header {
		position: sticky;
		top: 0;

		column-gap: 10px;

		justify-content: end;

		display: flex;
		align-items: center;

		padding: 8px 16px;
	}
</style>
