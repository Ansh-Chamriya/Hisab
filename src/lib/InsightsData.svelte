<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { Progress } from '$lib/components/ui/progress';
	import { Separator } from '$lib/components/ui/separator';
	export let Insights;
</script>

<div class="my-6 rounded-md bg-white p-4">
	{#each Insights as Insight}
		<div class="relative">
			<Avatar.Root class=" ">
				<Avatar.Fallback class="font-bold">I</Avatar.Fallback>
			</Avatar.Root>
			<p class="absolute left-14 top-1 text-lg font-bold">{Insight.name}</p>
			<span class="right absolute right-2 top-[2.6rem]">{Insight.insight}%</span>
			<Progress value={Insight.insight} class="mt-3 w-[80%]" />
			<Separator class="my-5" />
		</div>
	{/each}
</div>
