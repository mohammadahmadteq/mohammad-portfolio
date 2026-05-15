<script lang="ts">import { getContext } from 'svelte';
export let title = '';
export let description = '';
const activeImageStore = getContext('activeImage');
const imageCounterFunction = getContext('imageCounter');
const imageId = imageCounterFunction({
    title,
    description
});
</script>

{#if $activeImageStore === imageId}
    <slot {...$$restProps}/>
{/if}
