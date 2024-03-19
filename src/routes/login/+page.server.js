import { db } from '$lib/db.js';
import { profile } from '$lib/schema';
import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (session) {
		throw redirect(301, '/dashboard');
	}
	return {};
};
