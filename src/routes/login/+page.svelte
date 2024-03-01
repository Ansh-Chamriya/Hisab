<script>
	export let data;
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	let { supabase } = data;

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: '/'
			}
		});

		console.log(data, error);
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class="h-[23vh] ">
		<Card.Header>
			<Card.Title class="mb-7 text-2xl">Login</Card.Title>
		</Card.Header>
		<Card.Content>
			<Button class="p-6 text-center text-white" on:click={signInWithGoogle}
				>Sign In With Google</Button
			>
		</Card.Content>
	</Card.Root>
</div>
