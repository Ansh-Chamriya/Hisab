<script>
	import {
		circIn,
		circOut,
		elasticIn,
		elasticOut,
		expoIn,
		expoOut,
		quadIn,
		quadOut,
		quartIn,
		quartOut,
		quintIn,
		quintOut
	} from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p
		in:fly={{ y: 200, duration: 1000, easing: expoIn }}
		out:fly={{ easing: expoOut, y: 200, duration: 1000 }}
	>
		Flies in, fades out
	</p>
{/if}
