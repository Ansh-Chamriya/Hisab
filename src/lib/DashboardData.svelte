<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import toast, { Toaster } from 'svelte-french-toast';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	const date = new Date().toString().slice(0, 10);
	export let Datas;
	let isLoading = true;
	onMount(() => {
		isLoading = false;
	});
	function handleClick() {
		toast.success('Data Added Succesfully');
	}
	const idliPrices = [50, 30, 40];
	const chutneyPrices = [10, 20];
	const MenduvadaPrices = [70, 140];
</script>

<div class=" mt-4 font-bold text-slate-600">
	<span class="mb-6 ml-5">Today, {date}</span>
	{#each Datas as Data}
		<div class="mx-4 my-1">
			<Dialog.Root>
				<Dialog.Trigger>
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
					</div></Dialog.Trigger
				>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Edit Income</Dialog.Title>
						<Dialog.Description>
							Make changes to the Income here. Click save when you're done.
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<form action="?/update" method="post">
							<div class="mb-4 grid grid-cols-4 items-center gap-4">
								<Label for="articlePrice" class="text-right">Price</Label>
								<input
									type="hidden"
									name="incomeId"
									value={Data.income_id ? Data.income_id : Data.expense_id}
								/>
								{#if Data.article == 'Idli-khiru' || Data.article == 'Chutney' || Data.article == 'Menduvada-khiru'}
									<Select.Root>
										<Select.Trigger class="w-full bg-slate-50" name="updatePrice" id="articlePrice">
											<Select.Value />
										</Select.Trigger>
										<Select.Content class="bg-slate-50">
											<Select.Group>
												<Select.Label>Price</Select.Label>
												{#if Data.article == 'Idli-khiru'}
													{#each idliPrices as idliPrice}
														<Select.Item value={idliPrice}>{idliPrice}</Select.Item>
													{/each}
												{:else if Data.article == 'Chutney'}
													{#each chutneyPrices as chutneyPrice}
														<Select.Item value={chutneyPrice}>{chutneyPrice}</Select.Item>
													{/each}
												{:else if Data.article == 'Menduvada-khiru'}
													{#each MenduvadaPrices as MenduvadaPrice}
														<Select.Item value={MenduvadaPrice}>{MenduvadaPrice}</Select.Item>
													{/each}
												{/if}
											</Select.Group>
										</Select.Content>
										<Select.Input name="updatePrice" />
									</Select.Root>
								{:else}
									<Input
										id="articlePrice"
										name="updatePrice"
										type="number"
										value={Data.price}
										class="col-span-4"
									/>
								{/if}
							</div>
							<div class="mb-4 grid grid-cols-4 items-center gap-4">
								<Label for="articleQty" class="text-right">Quantity</Label>
								<Input
									id="articleQty"
									name="articleQty"
									type="number"
									value={Data.qty}
									class="col-span-3"
								/>
							</div>
							<Dialog.Footer>
								<Button type="submit" on:click={handleClick}>Save changes</Button>
							</Dialog.Footer>
						</form>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	{/each}
</div>
