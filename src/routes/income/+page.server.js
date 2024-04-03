import supabase from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const actions = {
	create: async (event) => {
		dayjs.extend(utc);
		const formData = await event.request.formData();
		const date = dayjs(new Date()).hour(12);
		const time = new Date().toString().slice(16, 25);
		const articles = {};
		const price = formData.get('price');
		const qty = formData.get('qty');
		console.log(date, time);
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Must have be logged in to create an account');
		}
		const userData = Object.fromEntries(formData);
		const udLength = Object.keys(userData).length / 3;
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
		}
	}
};
