<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/Navbar.svelte';
	import dayjs from 'dayjs';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { navigating } from '$app/stores';
	import { Jumper } from 'svelte-loading-spinners';
	function handleClick() {
		toast.success('Expense Added Succesfully');
	}
	const articles = [
		{ id: 1, article_name: 'Nariyal' },
		{ id: 2, article_name: 'Daliya' },
		{ id: 3, article_name: 'Other' }
	];
	let date = new Date();
	let isSelected = {};
	let otherValue = '';
	// $: console.log(isSelected);
</script>

{#if $navigating}
	<div class="flex h-full w-full items-center justify-center">
		<Jumper size="80" color="#000000" unit="px" duration="1s" />
	</div>
{:else}
	<Toaster />
	<div class="p-4">
		<h1 class="mt-10 text-2xl font-bold">Add new expense</h1>
		<p class="text-pretty text-slate-400">
			Enter the details of your sale to help you track your expense
		</p>
		<form method="POST" action="?/create" on:submit={handleClick} class="mb-[7rem] mt-8">
			<div class="my-4">
				<Label for="date">Today's Date :</Label>
				{dayjs(date).format('DD/MM/YYYY')}
			</div>
			<div class="my-4">
				<Label for="article">Select Article</Label>
				<!-- <select name="article" id="article" bind:value={isSelected}>
				{#each articles as article}
					<option value={article.article_name}>{article.article_name}</option>
				{/each}
			</select> -->

				<Select.Root bind:selected={isSelected}>
					<Select.Trigger class="w-full bg-slate-50" name="article" id="article">
						<Select.Value />
					</Select.Trigger>
					<Select.Content class="bg-slate-50">
						<Select.Group>
							<Select.Label>Articles</Select.Label>
							{#each articles as article}
								<SelectItem value={article.article_name}>{article.article_name}</SelectItem>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="article" />
				</Select.Root>
				{#if isSelected.value == 'Other'}
					<div class="my-4">
						<Label for="article">Enter Article Name</Label>
						<Input type="text" name="otherArticle" bind:value={otherValue} />
					</div>
				{/if}
			</div>
			<div class="my-4">
				<Label for="price">Price</Label>
				<Input type="number" id="price" name="price" class="bg-slate-50" />
			</div>
			<div class="my-4">
				<Label for="qty">Quantity</Label>
				{#if otherValue.toUpperCase() == 'CASH' || otherValue.toUpperCase() == 'SAMAN'}
					<Input type="number" name="qty" id="qty" disabled class="bg-slate-50" />
				{:else}
					<Input type="number" name="qty" id="qty" class="bg-slate-50" />
				{/if}
			</div>
			<Button type="submit" class="mt-6 w-full p-5">Submit</Button>
		</form>
	</div>
{/if}
<Navbar />
