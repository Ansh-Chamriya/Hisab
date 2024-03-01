<script>
	import { DateInput } from 'date-picker-svelte';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

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
			article_name: 'idli-khiru'
		},
		{
			id: 2,
			article_name: 'chutney'
		},
		{
			id: 3,
			article_name: 'Menduvada-khiru'
		}
	];
	let values = [
		{
			article: '',
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
	let t1 = { name: 'harsh' };
</script>

<Toaster />

<h1>Income Route</h1>
<form method="POST" action="?/create">
	<div class="">
		<label for="date">Select Date</label>
		<DateInput bind:value={date} />
	</div>
	{#each values as value, i}
		<div class="">
			<label for="article">Select Article</label>
			<select name="article{i}" id="article" bind:value={value.article}>
				{#each articles as article}
					<option value={article.article_name}>{article.article_name}</option>
				{/each}
			</select>
		</div>
		<div class="">
			<label for="price">Price</label>
			<select name="price{i}" id="price" bind:value={value.price}>
				{#if values[i].article == 'idli-khiru'}
					{#each idliPrices as idliPrice}
						<option value={idliPrice}>{idliPrice}</option>
					{/each}
				{:else if values[i].article == 'chutney'}
					{#each chutneyPrices as chutneyPrice}
						<option value={chutneyPrice}>{chutneyPrice}</option>
					{/each}
				{:else if values[i].article == 'Menduvada-khiru'}
					{#each MenduvadaPrices as MenduvadaPrice}
						<option value={MenduvadaPrice}>{MenduvadaPrice}</option>
					{/each}
				{/if}
			</select>
		</div>

		<div class="">
			<label for="qty">Quantity</label>
			<input type="text" name="qty{i}" id="qty{i}" bind:value={value.qty} />
		</div>
	{/each}
	<button on:click|preventDefault={addMore}>Add More</button>
	<button on:click|preventDefault={removeValues}>Remove</button>
	<button on:click={handleClick}>Submit</button>
</form>
<a href="/expense"> <button>Add expense</button></a>
