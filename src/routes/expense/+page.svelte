<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/Navbar.svelte';
	import dayjs from 'dayjs';
	function handleClick() {
		toast.success('Expense Added Succesfully');
	}
	const articles = [
		{ id: 1, article_name: 'Nariyal' },
		{ id: 2, article_name: 'Daliya' },
		{ id: 3, article_name: 'Other' }
	];
	let date = new Date();
	let selected = 'Nariyal';
	let otherValue = '';
	console.log(otherValue);
</script>

<Toaster />
<h2>Expense Route</h2>
<form method="POST" action="?/create" on:submit={handleClick}>
	<div class="">
		<label for="date">Today's Date</label>
		{dayjs(date).format('DD/MM/YYYY')}
	</div>
	<div class="">
		<label for="article">Select Article</label>
		<select name="article" id="article" bind:value={selected}>
			{#each articles as article}
				<option value={article.article_name}>{article.article_name}</option>
			{/each}
		</select>
		{#if selected == 'Other'}
			<div class="">
				<label for="article">Enter Article Name</label>
				<input type="text" name="article" bind:value={otherValue} />
			</div>
		{/if}
	</div>
	<div class="">
		<label for="price">price</label>
		<input type="text" id="price" name="price" />
	</div>
	<div class="">
		<label for="qty">Quantity</label>
		{#if otherValue == 'cash'}
			<input type="text" name="qty" id="qty" disabled />
		{:else}
			<input type="text" name="qty" id="qty" />
		{/if}
	</div>
	<button type="submit">Submit</button>
</form>
<Navbar />
