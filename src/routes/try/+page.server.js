/** @type {import('./$types').PageServerLoad} */
import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
export async function load(event) {
	const userSession = await event.locals.getSession();
	if (!userSession) {
		throw redirect(301, '/login');
	}

	const { data } = await supabase.from('profiles').select('id').eq('id', userSession.user.id);
	if (data.length == 0) {
		throw redirect(301, '/profile');
	}

	// fetching daily Income data

	const { data: todayIData } = await supabase
		.from('income')
		.select('article,price,qty,time')
		.eq('user_id', userSession.user.id)
		.eq('date', new Date().toISOString());

	const { data: daytotalIncome } = await supabase.rpc('calculate_daily_total', {
		p_user_id: userSession.user.id,
		todaydate: dayjs().toISOString()
	});

	const { data: todayEData } = await supabase
		.from('expense')
		.select('article,price,qty,time')
		.eq('user_id', userSession.user.id)
		.eq('date', dayjs().toISOString());

	const { data: daytotalExpense } = await supabase.rpc('calculate_daily_total_expense', {
		p_user_id: userSession.user.id,
		todaydate: dayjs().toISOString()
	});
	return {
		user_id: userSession.user.id,
		todayIData: todayIData,
		todayEData: todayEData,
		daytotalIncome: daytotalIncome ? daytotalIncome : 0,
		dayTotalExpense: daytotalExpense ? daytotalExpense : 0
	};
}
