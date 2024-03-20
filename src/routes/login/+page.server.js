import { db } from '$lib/db.js';
import { profile } from '$lib/schema';
import supabase from '$lib/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';

export const actions = () => {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider');
		if (provider) {
			const { data, error } = await locals.supabase.auth.signInWithOAuth({
				provider: provider
			});

			if (error) {
				console.log(error);
				return fail(400, {
					message: 'Failed to login with provider'
				});
			}
			console.log(data);
			throw redirect(303, data.url);
		}
		// console.log(session);
		// if (session) {
		// 	throw redirect(301, '/dashboard');
		// }
		// return {};
	};
};
