<script>
	export let data;
	import dayjs from 'dayjs';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import DashboardData from '$lib/DashboardData.svelte';
	$: isActive = 1;
	$: isBActive = null;
	const weekDate = dayjs().subtract(1, 'week').toString().slice(5, 11);
	const monthDate = dayjs().subtract(1, 'month').toString().slice(5, 11);
	const todayDatas = data.todayData;
	const weekDatas = data.weekData;
	const monthDatas = data.monthData;
	const dayTotalIncome = data.daytotalIncome;
	const weekTotalIncome = data.weekTotalIncome;
	const monthTotalIncome = data.monthTotalIncome;
	const { session, supabase } = data;
	const avatarUrl = session.user.user_metadata.avatar_url;
	const name = session.user.user_metadata.full_name;
	const date = new Date().toString().slice(0, 10);

	const toggleContent = (button) => {
		isActive = button;
		isBActive = true;
	};
	const INRCurrency = (amount) => {
		return amount.toLocaleString('en-IN', {
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'INR'
		});
	};
</script>

<nav>
	<div class="mt-4 flex p-2">
		<Avatar.Root class="mr-6 size-[3.25rem]">
			<Avatar.Image src={avatarUrl} alt="userImage" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="">
			<h1 class="mb-1 translate-y-1 text-[1.25rem] font-bold">Welcome, {name}</h1>
			<p class="text-bold text-xs text-slate-600">Don't worry, here is your buddy</p>
		</div>
	</div>
</nav>

<div class="filter-container m-auto mt-4 w-fit">
	<Button
		variant="secondary"
		class={isBActive ? 'active' : ''}
		on:click={() => toggleContent(1)}
		autofocus>Today</Button
	>
	<Button variant="secondary" class={isBActive ? 'active' : ''} on:click={() => toggleContent(2)}
		>This week</Button
	>
	<Button variant="secondary" class={isBActive ? 'active' : ''} on:click={() => toggleContent(3)}
		>This month</Button
	>
	<Button variant="secondary" class="rounded-3xl  focus:bg-black focus:text-slate-200"
		>Calender</Button
	>
</div>

<!-- <a href="/income"><button>add insert</button></a> -->

<Tabs.Root value="Hisab" class="m-auto mt-4 w-[95vw]">
	<Tabs.List class="grid h-fit w-full grid-cols-2 rounded-3xl ">
		<Tabs.Trigger
			value="Income"
			class="rounded-3xl p-2 data-[state=active]:bg-black data-[state=active]:text-slate-200"
			>Income</Tabs.Trigger
		>
		<Tabs.Trigger
			value="Expense"
			class="rounded-3xl p-2 data-[state=active]:bg-black data-[state=active]:text-slate-200"
			>Expense</Tabs.Trigger
		>
	</Tabs.List>
	<Tabs.Content value="Income">
		<Card.Root class="">
			<Card.Content class="p-0 py-6">
				<div
					class="expense-container text-s m-auto flex h-[12vh] w-[85vw] flex-col items-center justify-center rounded-lg bg-black text-slate-300"
				>
					Income so far
					<span class=" text-3xl text-white">
						{#if isActive == 1}
							{INRCurrency(dayTotalIncome)}
						{:else if isActive == 2}
							{INRCurrency(weekTotalIncome)}
						{:else if isActive == 3}
							{INRCurrency(monthTotalIncome)}
						{/if}
					</span>
				</div>
				{#if isActive == 1}
					<DashboardData Datas={todayDatas} />
				{/if}

				{#if isActive == 2}
					<DashboardData Datas={weekDatas} />
				{/if}
				{#if isActive == 3}
					<DashboardData Datas={monthDatas} />
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="Expense">
		<Card.Root>
			<Card.Content class="space-y-2">
				<div class="space-y-1"></div>
				<div class="space-y-1"></div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>

<style>
	.active {
		background-color: black;
		color: rgb(226 232 240);
	}
</style>
