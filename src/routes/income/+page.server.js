import supabase from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const actions = {
	create: async (event) => {
		dayjs.extend(utc);
		dayjs.extend(timezone);

		const formData = await event.request.formData();
		const d = dayjs().utc().local();
		const t = dayjs().utc().local();
		const date = dayjs.tz(d, 'Asia/Kolkata').format();
		const time = dayjs.tz(t, 'Asia/Kolkata').format('hh:mm:ss');
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
