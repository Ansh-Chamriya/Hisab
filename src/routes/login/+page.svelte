<script>
	export let data;
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { PUBLIC_DATABASE_ANON_KEY } from '$env/static/public';
	let { supabase } = data;

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `http://hisab-seven.vercel.app/login/callback`,
				queryParams: { apikey: PUBLIC_DATABASE_ANON_KEY }
			}
		});
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
