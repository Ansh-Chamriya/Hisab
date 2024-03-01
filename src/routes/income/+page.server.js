import supabase from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
export const actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const date = new Date().toISOString();
		const time = new Date().toString().slice(16, 25);
		const articles = {};
		const price = formData.get('price');
		const qty = formData.get('qty');

		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Must have be logged in to create an account');
		}
		const userData = Object.fromEntries(formData);
		const udLength = Object.keys(userData).length / 3;
		// console.log(formData);
		// console.log(formData.getAll('name'));
		console.log(udLength);

		for (let i = 0; i < udLength; i++) {
			const { data: profile } = await supabase
				.from('profiles')
				.select('id')
				.eq('id', session.user.id);
			const { data, error: e } = await supabase
				.from('income')
				.insert({
					article: userData[`article${i}`],
					price: userData[`price${i}`],
					qty: userData[`qty${i}`],
					date: date,
					time: time,
					user_id: profile[0].id
				})
				.select();
			// console.log(data, e);
		}
	}
};
