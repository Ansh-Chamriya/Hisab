<script>
	export let data;
	import dayjs from 'dayjs';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import DashboardData from '$lib/DashboardData.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { today, getLocalTimeZone } from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { navigating } from '$app/stores';
	$: isActive = null;
	$: isBActive = null;
	// today || "thisweek" || "thismonth" || "calender"
	let active_tab = 'today';
	const weekDate = dayjs().subtract(1, 'week').toString().slice(5, 11);
	const monthDate = dayjs().subtract(1, 'month').toString().slice(5, 11);
	const todayIDatas = data.todayIData;
	const weekIDatas = data.weekIData;
	const monthIDatas = data.monthIData;
	const dayTotalIncome = data.daytotalIncome;
	const weekTotalIncome = data.weekTotalIncome;
	const monthTotalIncome = data.monthTotalIncome;
	const todayEDatas = data.todayEData;
	const weekEDatas = data.weekEData;
	const monthEDatas = data.monthEData;
	const dayTotalExpense = data.dayTotalExpense;
	const weekTotalExpense = data.weekTotalExpense;
	const monthTotalExpense = data.monthTotalExpense;
	const { session, supabase } = data;
	const avatarUrl = session.user.user_metadata.avatar_url;
	const name = session.user.user_metadata.full_name;
	const date = new Date().toString().slice(0, 10);
	let dateValues = {
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ days: 7 })
	};

	// console.log('d atsss', dateValues);

	// $: console.log(dateValues.end);
	const INRCurrency = (amount) => {
		return amount.toLocaleString('en-IN', {
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'INR'
		});
	};

	let calenderIdata2;
	let calenderTotalIncome2;
	let calenderTotalExpense2;
	let calenderEdata2;
	async function getCalenderIncome() {
		if (dateValues.start && dateValues.end) {
			const start = dateValues.start.toLocaleString();
			const end = dateValues.end.toLocaleString();
			const response = await fetch('/dashboard', {
				method: 'POST',
				body: JSON.stringify({
					start: start,
					end: end,
					userid: data.user_id,
					dateValues: dateValues
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const { calenderIdata, calenderTotalIncome, calenderEdata, calenderTotalExpense } =
				await response.json();
			calenderEdata2 = calenderEdata;
			calenderTotalExpense2 = calenderTotalExpense;
			calenderIdata2 = calenderIdata;
			calenderTotalIncome2 = calenderTotalIncome;
		}
	}

	let canRun = false;

	$: {
		if (canRun && dateValues.start) {
			getCalenderIncome();
		}
	}

	onMount(() => {
		canRun = true;
	});
</script>

{#if $navigating}
	<div class="flex h-[25vh] w-[25vw] animate-spin items-center justify-center">😊</div>
{:else}
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
			variant={active_tab === 'today' ? 'default' : 'secondary'}
			on:click={() => (active_tab = 'today')}
			class="rounded-3xl"
			autofocus>Today</Button
		>
		<Button
			variant={active_tab === 'thisweek' ? 'default' : 'secondary'}
			class="rounded-3xl"
			on:click={() => (active_tab = 'thisweek')}>This week</Button
		>
		<Button
			variant={active_tab === 'thismonth' ? 'default' : 'secondary'}
			class="rounded-3xl"
			on:click={() => (active_tab = 'thismonth')}>This month</Button
		>
		<Popover.Root openFocus>
			<Popover.Trigger asChild let:builder>
				<Button
					variant={active_tab === 'calender' ? 'default' : 'secondary'}
					class="rounded-3xl"
					builders={[builder]}
					on:click={() => (active_tab = 'calender')}>Calender</Button
				>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<RangeCalendar
					on:click={getCalenderIncome}
					bind:value={dateValues}
					class="rounded-md border shadow"
				/>
				<!-- <Button on:click={getCalenderIncome}>Apply</Button> -->
			</Popover.Content>
		</Popover.Root>
	</div>

	<!-- <a href="/income"><button>add insert</button></a> -->

	<Tabs.Root value="Income" class="m-auto mb-[7rem] mt-4 w-[95vw]">
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
							{#if active_tab === 'today'}
								{INRCurrency(dayTotalIncome)}
							{:else if active_tab === 'thisweek'}
								{INRCurrency(weekTotalIncome)}
							{:else if active_tab === 'thismonth'}
								{INRCurrency(monthTotalIncome)}
							{:else if active_tab === 'calender'}
								{INRCurrency(calenderTotalIncome2 ? calenderTotalIncome2 : 0)}
							{/if}
						</span>
					</div>
					{#if active_tab === 'today'}
						<DashboardData Datas={todayIDatas} />
					{/if}

					{#if active_tab == 'thisweek'}
						<DashboardData Datas={weekIDatas} />
					{/if}
					{#if active_tab == 'thismonth'}
						<DashboardData Datas={monthIDatas} />
					{/if}
					{#if active_tab == 'calender'}
						<DashboardData Datas={calenderIdata2} />
					{/if}
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="Expense">
			<Card.Root class="">
				<Card.Content class="p-0 py-6">
					<div
						class="expense-container text-s m-auto flex h-[12vh] w-[85vw] flex-col items-center justify-center rounded-lg bg-black text-slate-300"
					>
						Expense so far
						<span class=" text-3xl text-white">
							{#if active_tab === 'today'}
								{INRCurrency(dayTotalExpense)}
							{:else if active_tab == 'thisweek'}
								{INRCurrency(weekTotalExpense)}
							{:else if active_tab === 'thismonth'}
								{INRCurrency(monthTotalExpense)}
							{:else if active_tab === 'calender'}
								{INRCurrency(calenderTotalExpense2 ? calenderTotalExpense2 : 0)}
							{/if}
						</span>
					</div>
					{#if active_tab === 'today'}
						<DashboardData Datas={todayEDatas} />
					{/if}

					{#if active_tab == 'thisweek'}
						<DashboardData Datas={weekEDatas} />
					{/if}
					{#if active_tab === 'thismonth'}
						<DashboardData Datas={monthEDatas} />
					{/if}
					{#if active_tab === 'calender'}
						<DashboardData Datas={calenderEdata2} />
					{/if}
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>

	<Navbar />
{/if}

<style>
	:global(body) {
		background-color: rgb(248, 250, 252);
	}
</style>
