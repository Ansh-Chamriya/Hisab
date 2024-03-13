<script>
	export let data;
	import InsightsData from '$lib/InsightsData.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	let activeTab = 'week';
	const insightdata = data.Insightdata;
</script>

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
	<InsightsData Insights={insightdata} />
</div>
<Navbar />

<style>
	:global(body) {
		background-color: rgb(248, 250, 252);
	}
</style>
