<script context="module">
	let activeTab = 'home';
</script>

<script>
	import Home from 'lucide-svelte/icons/home';
	import TrendingUp from 'lucide-svelte/icons/trending-up';
	import Plus from 'lucide-svelte/icons/plus';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import * as Popover from '$lib/components/ui/popover';
</script>

<nav
	class="fixed bottom-0 z-50 flex w-[100vw] flex-row items-center justify-between bg-white px-10 py-3"
>
	<a href="/dashboard" class="" on:click={() => (activeTab = 'home')}>
		<div class="flex flex-col items-center rounded-md">
			{#if activeTab === 'home'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 24 24"
					{...$$props}
				>
					<path fill="currentColor" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.385h-3.616V20z" />
				</svg>{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 24 24"
					{...$$props}
				>
					<path
						fill="currentColor"
						d="M6 19h3.692v-5.885h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.885h-2.616V20zm7-7.77"
					/>
				</svg>
			{/if}
			<p class="mt-1 text-xs">Home</p>
		</div></a
	>
	<div class="">
		<div class="flex -translate-y-10 items-center justify-center rounded-[50%] bg-black p-5">
			<Popover.Root>
				<Popover.Trigger><Plus class=" text-white" /></Popover.Trigger>
				<Popover.Content class="top-[600px] flex justify-between rounded-md"
					><a href="/income" on:click={() => (activeTab = 'add')}
						><Button class="my-4 mr-10 p-5">Income</Button></a
					>
					<a href="/expense" on:click={() => (activeTab = 'add')}
						><Button class="my-4 p-5">Expense</Button></a
					></Popover.Content
				>
			</Popover.Root>
		</div>
	</div>
	<a href="/insights" on:click={() => (activeTab = 'insights')}>
		<div class="flex flex-col items-center">
			{#if activeTab == 'insights'}
				<TrendingUp strokeWidth={3} size={30} />
			{:else}
				<TrendingUp size={30} />
			{/if}
			<p class="mt-1 text-xs">Insights</p>
		</div></a
	>
</nav>
