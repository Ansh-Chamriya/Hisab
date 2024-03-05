import { json } from '@sveltejs/kit';
import supabaseClient from '$lib/supabaseClient.js';
import supabase from '$lib/supabaseClient.js';
export async function POST({ request }) {
	const { start, end, userid, dateValues } = await request.json();

	const { data: calenderIdata, error } = await supabase
		.from('income')
		.select('article,price,qty,time')
		.eq('user_id', userid)
		.gt('date', start)
		.lte('date', end);
	const { data: calenderEdata } = await supabase
		.from('expense')
		.select('article,price,qty,time')
		.eq('user_id', userid)
		.gt('date', start)
		.lte('date', end);
	const { data: calenderTotalIncome } = await supabaseClient.rpc(
		'calculate_calender_total_income',
		{
			u_user_id: userid,
			sdate: start,
			edate: end
		}
	);
	const { data: calenderTotalExpense } = await supabaseClient.rpc(
		'calculate_calender_total_expense',
		{
			u_user_id: userid,
			sdate: start,
			edate: end
		}
	);
	return json({
		calenderIdata: calenderIdata,
		calenderEdata: calenderEdata,
		calenderTotalIncome: calenderTotalIncome,
		calenderTotalExpense: calenderTotalExpense
	});
}
