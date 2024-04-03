<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	const date = new Date().toString().slice(0, 10);
	export let Datas;
	let isLoading = true;
	onMount(() => {
		isLoading = false;
	});
</script>

{#if isLoading}
	<Skeleton class="h-52 w-52 rounded-full" />
{:else}
	<div class=" mt-4 font-bold text-slate-600">
		<span class="mb-6 ml-5">Today, {date}</span>
		{#each Datas as Data}
			<div
				class=" relative m-auto mt-2 flex h-16 w-[85vw] rounded-lg border border-slate-200 text-black"
			>
				<Avatar.Root class="absolute left-2 top-2">
					<Avatar.Image src="#" alt="userImage" />

					<Avatar.Fallback>{Data.article.slice(0, 1)}</Avatar.Fallback>
				</Avatar.Root>
				<h2 class="absolute left-14 top-1">{Data.article}</h2>
				<h2 class="absolute right-5 top-1">Qty: {Data.qty}</h2>
				<span class="absolute bottom-2 right-5"
					>{Data.price.toLocaleString('en-IN', {
						maximumFractionDigits: 2,
						style: 'currency',
						currency: 'INR'
					})}
				</span>
				<span class="absolute bottom-2 left-14 text-sm text-slate-400">{Data.time}</span>
				<span class="absolute bottom-2 left-[7.25rem] text-sm text-slate-400"
					>{dayjs(Data.date).format('DD/MM/YYYY')}</span
				>
			</div>
		{/each}
	</div>
{/if}
