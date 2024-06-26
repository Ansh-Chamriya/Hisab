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
		let article = formData.get('article');
		let otherArticle = formData.get('otherArticle');
		otherArticle =
			otherArticle?.substring(0, 1).toUpperCase() +
			otherArticle?.substring(1, otherArticle.length).toLowerCase();

		const price = formData.get('price');
		const qty = formData.get('qty') ? formData.get('qty') : 1;
		if (article === 'Other') {
			article = otherArticle;
		}

		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Must have be logged in to create an account');
		}
		const { data: profile } = await supabase
			.from('profiles')
			.select('id')
			.eq('id', session.user.id);
		const { data, error: e } = await supabase
			.from('expense')
			.insert({
				article: article,
				price: price,
				qty: qty,
				date: date,
				time: time,
				user_id: profile[0].id
			})
			.select();
		console.log(data, e);
	}
};
