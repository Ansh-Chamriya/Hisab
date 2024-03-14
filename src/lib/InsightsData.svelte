<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { Progress } from '$lib/components/ui/progress';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	export let Insights;
	let values = [0, 0, 0];
	onMount(() => {
		const timer = setTimeout(() => {
			for (let i = 0; i < 3; i++) {
				values[i] = Insights[i].insight;
			}
		}, 500);
		return () => clearTimeout(timer);
	});
	const INRCurrency = (amount) => {
		return amount.toLocaleString('en-IN', {
			maximumFractionDigits: 0,
			style: 'currency',
			currency: 'INR'
		});
	};
</script>

<div class="my-6 rounded-md bg-white p-4">
	{#each Insights as Insight, i}
		<div class="relative">
			<Avatar.Root class=" ">
				<Avatar.Fallback class="font-bold">{Insight.name.slice(0, 1)}</Avatar.Fallback>
			</Avatar.Root>
			<p class="absolute left-14 top-1 text-lg font-bold">{Insight.name}</p>
			<span class="right absolute right-2 top-[2.6rem]">{Insight.insight}%</span>
			<span class="absolute right-3 top-2">{INRCurrency(Insight.articleTotal)}</span>
			<Progress value={values[i]} class="mt-3 w-[80%]" />
			<Separator class="my-5" />
		</div>
	{/each}
</div>
