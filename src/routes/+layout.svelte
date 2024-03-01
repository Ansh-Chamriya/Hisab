<script>
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<!-- <nav>
	<a href="/">HOME</a>
	<a href="/login">Login</a>
	<a href="/dashboard">DashBoard</a>
	<button on:click={logout}>Logout</button>
</nav> -->
<slot />
