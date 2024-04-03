<script>
	import dayjs from 'dayjs';
	import toast, { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/Navbar.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Item } from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	function handleClick() {
		toast.success('Data Added Succesfully');
	}
	let date = new Date();
	const idliPrices = [50, 30, 40];
	const chutneyPrices = [10, 20];
	const MenduvadaPrices = [70, 140];
	let articles = [
		{
			id: 1,
			article_name: 'Idli-khiru'
		},
		{
			id: 2,
			article_name: 'Chutney'
		},
		{
			id: 3,
			article_name: 'Menduvada-khiru'
		}
	];
	let values = [
		{
			article: {},
			price: '',
			qty: ''
		}
	];
	const addMore = () => {
		values = [...values, { article: '', price: '', qty: '' }];
	};
	const removeValues = () => {
		if (values.length > 1) {
			values = values.slice(0, values.length - 1);
		}
	};
	// $: console.log(values[0]);
</script>

<Toaster />
<div class="p-4">
	<h1 class="mt-10 text-2xl font-bold">Add new income</h1>
	<p class="text-pretty text-slate-400">
		Enter the details of your sales to help you track your income
	</p>
	<form method="POST" action="?/create" on:submit={handleClick} class="mb-[7rem] mt-8">
		<div class="my-4">
			<Label for="date">Today's Date :</Label>
			{dayjs(date).format('DD/MM/YYYY')}
		</div>
		{#each values as value, i}
			<div class="my-4">
				<Label for="article">Select Article</Label>
				<!-- <select name="article{i}" id="article" bind:value={value.article}>
					{#each articles as article}
						<option value={article.article_name}>{article.article_name}</option>
					{/each}
				</select> -->

				<Select.Root bind:selected={value.article}>
					<Select.Trigger class="w-full bg-slate-50" name="article{i}" id="article">
						<Select.Value />
					</Select.Trigger>
					<Select.Content class="bg-slate-50">
						<Select.Group>
							<Select.Label>Articles</Select.Label>
							{#each articles as article}
								<Select.Item value={article.article_name}>{article.article_name}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="article{i}" />
				</Select.Root>
			</div>
			<div class="my-4">
				<Label for="price">Price</Label>
				<!-- <select name="price{i}" id="price" bind:value={value.price}>
					{#if values[i].article == 'Idli-khiru'}
						{#each idliPrices as idliPrice}
							<option value={idliPrice}>{idliPrice}</option>
						{/each}
					{:else if values[i].article == 'Chutney'}
						{#each chutneyPrices as chutneyPrice}
							<option value={chutneyPrice}>{chutneyPrice}</option>
						{/each}
					{:else if values[i].article == 'Menduvada-khiru'}
						{#each MenduvadaPrices as MenduvadaPrice}
							<option value={MenduvadaPrice}>{MenduvadaPrice}</option>
						{/each}
					{/if}
				</select> -->

				<Select.Root>
					<Select.Trigger
						class="w-full bg-slate-50"
						name="price{i}"
						id="price"
						bind:value={value.price}
					>
						<Select.Value />
					</Select.Trigger>
					<Select.Content class="bg-slate-50">
						<Select.Group>
							<Select.Label>Price</Select.Label>
							{#if values[i].article.value == 'Idli-khiru'}
								{#each idliPrices as idliPrice}
									<Select.Item value={idliPrice}>{idliPrice}</Select.Item>
								{/each}
							{:else if values[i].article.value == 'Chutney'}
								{#each chutneyPrices as chutneyPrice}
									<Select.Item value={chutneyPrice}>{chutneyPrice}</Select.Item>
								{/each}
							{:else if values[i].article.value == 'Menduvada-khiru'}
								{#each MenduvadaPrices as MenduvadaPrice}
									<Select.Item value={MenduvadaPrice}>{MenduvadaPrice}</Select.Item>
								{/each}
							{/if}
						</Select.Group>
					</Select.Content>
					<Select.Input name="price{i}" />
				</Select.Root>
			</div>

			<div class="my-4">
				<Label for="qty" class="">Quantity</Label>
				<Input type="number" name="qty{i}" id="qty{i}" bind:value={value.qty} class="bg-slate-50" />
			</div>
		{/each}
		<div class="mt-8 flex justify-between px-4">
			<Button on:click={addMore}>Add More</Button>
			<Button on:click={removeValues}>Remove</Button>
		</div>
		<Button type="submit" class="mt-8 w-full">Submit</Button>
	</form>
</div>
<Navbar />
