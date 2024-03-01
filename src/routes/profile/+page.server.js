import { db } from '$lib/db.js';
import { profile } from '$lib/schema.js';
import { error, redirect } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';

// TODO: set it so that on load the user will be redirected if they have the wrong auth state
export const actions = {
	create: async (event) => {
		// get the form body from the event
		const formData = await event.request.formData();

		const p_no = formData.get('p_no');
		if (!p_no) {
			throw error(400, 'Must send a valid Phone Number');
		}

		// create the user
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Must have be logged in to create an account');
		}

		const { data, error: e } = await supabase
			.from('profiles')
			.update({
				p_no: p_no
			})
			.eq('id', session.user.id)
			.select();
		// console.log(e, data);
		// console.log(session);
		throw redirect(301, '/dashboard');
	}
};
// export const load = async (event) => {
// 	const session = await event.locals.getSession();
// 	const { data } = await supabase.from('profiles').select('user_id').eq('user_id', session.user.id);
// 	console.log(data);
// 	if (data) {
// 		throw redirect(301, '/dashboard');
// 	}
// };
