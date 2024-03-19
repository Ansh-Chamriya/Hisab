import { PUBLIC_DATABASE_URL, PUBLIC_DATABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_DATABASE_URL,
		supabaseKey: PUBLIC_DATABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	// TODO: Replace the following with your app's Firebase project configuration
	// See: https://firebase.google.com/docs/web/learn-more#config-object

	return { supabase, session };
};
