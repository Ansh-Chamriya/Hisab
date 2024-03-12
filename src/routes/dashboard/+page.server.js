import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const load = async (event) => {
	const userSession = await event.locals.getSession();
	const weekDate = dayjs().subtract(1, 'week').toISOString();
	const monthDate = dayjs().subtract(1, 'month').toISOString();
	if (!userSession) {
		throw redirect(301, '/login');
	}
	// console.log(event);
	// check for profile
	// cookies.set('userid', userSession.user.id, { path: '/dashboard' });
	const { data } = await supabase.from('profiles').select('id').eq('id', userSession.user.id);
	if (data.length == 0) {
		throw redirect(301, '/profile');
	}

	// fetching daily Income data

	const { data: todayIData } = await supabase
		.from('income')
		.select('article,price,qty,time,date')
		.eq('user_id', userSession.user.id)
		.eq('date', new Date().toISOString());

	// fetching weekly data

	const { data: weekIData } = await supabase
		.from('income')
		.select('article,price,qty,date,time')
		.eq('user_id', userSession.user.id)
		.gt('date', weekDate)
		.lte('date', dayjs().toISOString());

	// fetching monthly data

	const { data: monthIData } = await supabase
		.from('income')
		.select('article,price,qty,date,time')
		.eq('user_id', userSession.user.id)
		.gt('date', monthDate)
		.lte('date', dayjs().toISOString());

	// fetching total daily income

	const { data: daytotalIncome } = await supabase.rpc('calculate_daily_total', {
		p_user_id: userSession.user.id,
		todaydate: dayjs().toISOString()
	});

	// fetching total weekly income

	const { data: weekTotalIncome } = await supabase.rpc('calculate_weekly_total', {
		u_user_id: userSession.user.id,
		sdate: weekDate,
		edate: dayjs().toISOString()
	});

	// fetching total monthly income

	const { data: monthTotalIncome, error } = await supabase.rpc('calculate_monthly_total', {
		u_user_id: userSession.user.id,
		sdate: monthDate,
		edate: dayjs().toISOString()
	});

	// Expense section

	// fetching daily Income data

	const { data: todayEData } = await supabase
		.from('expense')
		.select('article,price,qty,time')
		.eq('user_id', userSession.user.id)
		.eq('date', dayjs().toISOString());

	// fetching weekly data

	const { data: weekEData } = await supabase
		.from('expense')
		.select('article,price,qty,date,time')
		.eq('user_id', userSession.user.id)
		.gt('date', weekDate)
		.lte('date', dayjs().toISOString());

	// fetching monthly data

	const { data: monthEData } = await supabase
		.from('expense')
		.select('article,price,qty,date,time')
		.eq('user_id', userSession.user.id)
		.gt('date', monthDate)
		.lte('date', dayjs().toISOString());

	// Fetching daily total expense

	const { data: daytotalExpense } = await supabase.rpc('calculate_daily_total_expense', {
		p_user_id: userSession.user.id,
		todaydate: dayjs().toISOString()
	});

	// fetching total weekly expense

	const { data: weekTotalExpense } = await supabase.rpc('calculate_weekly_total_expense', {
		u_user_id: userSession.user.id,
		sdate: weekDate,
		edate: dayjs().toISOString()
	});

	// fetching total monthly income

	const { data: monthTotalExpense } = await supabase.rpc('calculate_monthly_total_expense', {
		u_user_id: userSession.user.id,
		sdate: monthDate,
		edate: dayjs().toISOString()
	});

	return {
		user_id: userSession.user.id,
		todayIData: todayIData,
		weekIData: weekIData,
		monthIData: monthIData,
		todayEData: todayEData,
		weekEData: weekEData,
		monthEData: monthEData,
		daytotalIncome: daytotalIncome ? daytotalIncome : 0,
		weekTotalIncome: weekTotalIncome ? weekTotalIncome : 0,
		monthTotalIncome: monthTotalIncome ? monthTotalIncome : 0,
		dayTotalExpense: daytotalExpense ? daytotalExpense : 0,
		weekTotalExpense: weekTotalExpense ? weekTotalExpense : 0,
		monthTotalExpense: monthTotalExpense ? monthTotalExpense : 0
	};
};
