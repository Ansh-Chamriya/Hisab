<script>
	export let data;
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { PUBLIC_DATABASE_ANON_KEY } from '$env/static/public';
	import { redirect } from '@sveltejs/kit';
	let { supabase } = data;

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `/login/callback`
			}
		});

		if (data.url) {
			redirect(302, data.url); // use the redirect API for your server framework
		}
	}
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
