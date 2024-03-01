<script>
	import { redirect } from '@sveltejs/kit';

	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);

	async function logout() {
		await supabase.auth.signOut();
		throw redirect(301, '/');
	}
</script>

<form class="w-[400px] mx-4 p-4 bg-white drop-shadow-lg" method="POST" action="?/create">
	<h2 class="text-xl font-bold mb-2">Create Profile</h2>
	<div class="mt-2">
		<label id="p_no" for="p_no" class="block">Phone Number</label>
		<input id="p_no" type="text" name="p_no" class="border-2 border-neutral-800 w-full px-4 py-2" />
	</div>

	<div class="w-full flex justify-center mt-3">
		<button
			class="border-2 border-neutral-900 text-neutral-900 px-4 py-2 font-light hover:border-neutral-500"
			type="submit">Sign Up</button
		>
	</div>
</form>
