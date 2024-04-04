import { json } from '@sveltejs/kit';
import supabaseClient from '$lib/supabaseClient.js';
import supabase from '$lib/supabaseClient.js';
export async function POST({ request }) {
	const { start, end, userid } = await request.json();
	const userSession = await request.locals.getsession();
	const { data: calenderIdata, error } = await supabase
		.from('income')
		.select('article,price,qty,time,date')
		.eq('user_id', userSession.user.id)
		.gte('date', start)
		.lte('date', end);
	const { data: calenderEdata, error: e } = await supabase
		.from('expense')
		.select('article,price,qty,time,date')
		.eq('user_id', userSession.user.id)
		.gte('date', start)
		.lte('date', end);
	console.log(calenderIdata, calenderEdata);
	console.log(error, e);
	console.log('userId', userSession.user.id);

	return json({
		AccCalenderIdata: calenderIdata,
		AccCalenderEdata: calenderEdata
	});
}
