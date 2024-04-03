import supabase from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
export const actions = {
	create: async (event) => {
		dayjs.extend(utc);
		const formData = await event.request.formData();
		const date = dayjs().utc().local();
		const time = dayjs().utc().local().format('hh:mm:ss');

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
