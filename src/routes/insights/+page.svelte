<script>
	export let data;
	import InsightsData from '$lib/InsightsData.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import { navigating } from '$app/stores';
	let activeTab = 'week';
	const weeklyinsightdata = data.Insightdata[0];
	const monthlyinsightdata = data.Insightdata[1];
</script>

{#if $navigating}
	<div class="flex h-[25vh] w-[25vw] animate-spin items-center justify-center">😊</div>
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
