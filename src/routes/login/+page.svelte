<script>
	export let data;
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { PUBLIC_DATABASE_ANON_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let { supabase } = data;

	function getVercelAppUrl() {
		return import.meta.env.VERCEL_URL
			? `https://${import.meta.env.VERCEL_URL}`
			: 'http://localhost:5173';
	}

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getVercelAppUrl()}/login/callback`
			}
		});
	}
	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		if (data.user) {
			goto('/dashboard', { replaceState: true });
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class="h-[23vh] ">
		<Card.Header>
			<Card.Title class="mb-7 text-2xl">Login</Card.Title>
		</Card.Header>
		<Card.Content>
			<Button on:click={signInWithGoogle} class="p-6 text-center text-white"
				>Sign In With Google</Button
			>
		</Card.Content>
	</Card.Root>
</div>
