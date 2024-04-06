<script>
	export let data;
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import Navbar from '$lib/Navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import ExcelJS from 'exceljs';
	import saveAs from 'file-saver';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { navigating } from '$app/stores';
	import { Jumper } from 'svelte-loading-spinners';
	let AccCalenderEdata2;
	let AccCalenderIdata2;
	$: console.log(dateValues);
	const userId = data.session.user.id;
	const start = today(getLocalTimeZone());
	const end = today(getLocalTimeZone()).add({ days: 7 });
	let dateValues = {
		start,
		end
	};
	let canRun = false;

	$: {
		if (canRun && dateValues.start) {
			getCalenderIncome();
		}
	}
	onMount(() => {
		canRun = true;
	});
	async function exportToExcel() {
		let Incomedata = AccCalenderIdata2;
		let Expensedata = AccCalenderEdata2;
		const workbook = new ExcelJS.Workbook();
		const IncomeWorksheet = workbook.addWorksheet('Income Worksheet');
		const ExpenseWorksheet = workbook.addWorksheet('Expense Worksheet');
		// Incomedata.forEach((row, index) => {
		// 	IncomeWorksheet.addRow({
		// 		id: index + 1,
		// 		...row
		// 	});
		// });
		// Expensedata.forEach((row, index) => {
		// 	ExpenseWorksheet.addRow({
		// 		id: index + 1,
		// 		...row
		// 	});
		// });
		IncomeWorksheet.addRow(['article', 'price', 'qty', 'time', 'date']);
		ExpenseWorksheet.addRow(['article', 'price', 'qty', 'time', 'date']);
		IncomeWorksheet.addRows(Incomedata);
		ExpenseWorksheet.addRows(Expensedata);
		const workbookBlob = await workbook.xlsx.writeBuffer();

		const blob = new Blob([workbookBlob], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		saveAs(blob, 'Accounts.xlsx');
	}
	async function getCalenderIncome() {
		if (dateValues.start && dateValues.end) {
			const start = dateValues.start.toLocaleString();
			const end = dateValues.end.toLocaleString();
			try {
				const response = await fetch('/Accounting', {
					method: 'POST',
					body: JSON.stringify({
						start: start,
						end: end,
						userid: userId,
						dateValues: dateValues
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const { AccCalenderIdata, AccCalenderEdata } = await response.json();
				AccCalenderEdata2 = AccCalenderEdata;
				AccCalenderIdata2 = AccCalenderIdata;
				for (let i = 0; i < AccCalenderEdata2?.length; i++) {
					AccCalenderEdata2[i] = Object.values(AccCalenderEdata2[i]);
				}
				for (let j = 0; j < AccCalenderIdata2?.length; j++) {
					AccCalenderIdata2[j] = Object.values(AccCalenderIdata2[j]);
				}
			} catch (error) {
				console.log(error);
			}
			console.log('After Expense', AccCalenderEdata2);
			console.log('After Income', AccCalenderIdata2);
		}
	}
</script>

{#if $navigating}
	<div class="flex h-full w-full items-center justify-center">
		<Jumper size="80" color="#000000" unit="px" duration="1s" />
	</div>
{:else}
	<div class="flex h-full flex-col items-center justify-center">
		<RangeCalendar
			bind:value={dateValues}
			on:click={getCalenderIncome}
			class="mb-5 rounded-md border shadow"
		/>
		<Button on:click={exportToExcel}>Download Excel</Button>
	</div>
{/if}
<Navbar />
