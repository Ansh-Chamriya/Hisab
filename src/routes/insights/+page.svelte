<script>
	export let data;
	import InsightsData from '$lib/InsightsData.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import { navigating } from '$app/stores';
	import { Jumper } from 'svelte-loading-spinners';

	let activeTab = 'week';
	const weeklyinsightdata = data.Insightdata[0];
	const monthlyinsightdata = data.Insightdata[1];
</script>

{#if $navigating}
	<div class="flex h-full w-full items-center justify-center">
		<Jumper size="80" color="#000000" unit="px" duration="1s" />
	</div>
{:else}
	<div class=" p-5">
		<h1 class="mb-8 mt-14 text-4xl font-bold">Insights</h1>
		<Button
			variant={activeTab === 'week' ? 'default' : 'outline'}
			class="mr-3 rounded-2xl p-3"
			on:click={() => (activeTab = 'week')}>This Week</Button
		>
		<Button
			variant={activeTab === 'month' ? 'default' : 'outline'}
			class="rounded-2xl p-3"
			on:click={() => (activeTab = 'month')}>This Month</Button
		>
		{#if activeTab === 'week'}
			<InsightsData Insights={weeklyinsightdata} />
		{:else if activeTab === 'month'}
			<InsightsData Insights={monthlyinsightdata} />
		{/if}
	</div>
{/if}
<Navbar />

<style>
	:global(body) {
		background-color: rgb(248, 250, 252);
	}
</style>
