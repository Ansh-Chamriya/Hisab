import supabase from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
export const actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const date = dayjs(new Date()).hour(12);
		const time = new Date().toString().slice(16, 25);
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
