import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (session) {
		throw redirect(301, '/dashboard');
	}
}
