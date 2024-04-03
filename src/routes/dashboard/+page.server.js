import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const load = async (event) => {
	dayjs.extend(utc);
	dayjs.extend(timezone);

	const d = dayjs().utc().local();
	const userSession = await event.locals.getSession();
	const weekDate = dayjs().startOf('w').add(1, 'day').utc().local().format();
	const monthDate = dayjs().startOf('M').utc().local().format();

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

	const [
		{ data: todayIData },
		{ data: weekIData },
		{ data: monthIData },
		{ data: daytotalIncome },
		{ data: weekTotalIncome },
		{ data: monthTotalIncome },
		{ data: todayEData },
		{ data: weekEData },
		{ data: monthEData },
		{ data: daytotalExpense },
		{ data: weekTotalExpense },
		{ data: monthTotalExpense }
	] = await Promise.all([
		supabase
			.from('income')
			.select('article,price,qty,time,date')
			.eq('user_id', userSession.user.id)
			.eq('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('income')
			.select('article,price,qty,date,time')
			.eq('user_id', userSession.user.id)
			.gte('date', weekDate)
			.lte('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('income')
			.select('article,price,qty,date,time')
			.eq('user_id', userSession.user.id)
			.gte('date', monthDate)
			.lte('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase.rpc('calculate_daily_total', {
			p_user_id: userSession.user.id,
			todaydate: dayjs.tz(d, 'Asia/Kolkata').format()
		}),
		supabase.rpc('calculate_weekly_total', {
			u_user_id: userSession.user.id,
			sdate: weekDate,
			edate: dayjs.tz(d, 'Asia/Kolkata').format()
		}),
		supabase.rpc('calculate_monthly_total', {
			u_user_id: userSession.user.id,
			sdate: monthDate,
			edate: dayjs.tz(d, 'Asia/Kolkata').format()
		}),
		supabase
			.from('expense')
			.select('article,price,qty,time')
			.eq('user_id', userSession.user.id)
			.eq('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('expense')
			.select('article,price,qty,date,time')
			.eq('user_id', userSession.user.id)
			.gte('date', weekDate)
			.lte('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('expense')
			.select('article,price,qty,date,time')
			.eq('user_id', userSession.user.id)
			.gte('date', monthDate)
			.lte('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase.rpc('calculate_daily_total_expense', {
			p_user_id: userSession.user.id,
			todaydate: dayjs.tz(d, 'Asia/Kolkata').format()
		}),
		supabase.rpc('calculate_weekly_total_expense', {
			u_user_id: userSession.user.id,
			sdate: weekDate,
			edate: dayjs.tz(d, 'Asia/Kolkata').format()
		}),
		supabase.rpc('calculate_monthly_total_expense', {
			u_user_id: userSession.user.id,
			sdate: monthDate,
			edate: dayjs.tz(d, 'Asia/Kolkata').format()
		})
	]);
	// fetching daily Income data

	// const { data: todayIData } = await supabase
	// 	.from('income')
	// 	.select('article,price,qty,time,date')
	// 	.eq('user_id', userSession.user.id)
	// 	.eq('date', dayjs().utc().local().format());
	// fetching weekly data

	// const { data: weekIData } = await supabase
	// 	.from('income')
	// 	.select('article,price,qty,date,time')
	// 	.eq('user_id', userSession.user.id)
	// 	.gte('date', weekDate)
	// 	.lte('date', dayjs().utc().local().format());

	// fetching monthly data

	// const { data: monthIData } = await supabase
	// 	.from('income')
	// 	.select('article,price,qty,date,time')
	// 	.eq('user_id', userSession.user.id)
	// 	.gte('date', monthDate)
	// 	.lte('date', dayjs().utc().local().format());

	// fetching total daily income

	// const { data: daytotalIncome } = await supabase.rpc('calculate_daily_total', {
	// 	p_user_id: userSession.user.id,
	// 	todaydate: dayjs().utc().local().format()
	// });

	// fetching total weekly income

	// const { data: weekTotalIncome } = await supabase.rpc('calculate_weekly_total', {
	// 	u_user_id: userSession.user.id,
	// 	sdate: weekDate,
	// 	edate: dayjs().utc().local().format()
	// });

	// fetching total monthly income

	// const { data: monthTotalIncome, error } = await supabase.rpc('calculate_monthly_total', {
	// 	u_user_id: userSession.user.id,
	// 	sdate: monthDate,
	// 	edate: dayjs().utc().local().format()
	// });

	// Expense section

	// fetching daily Income data

	// const { data: todayEData } = await supabase
	// 	.from('expense')
	// 	.select('article,price,qty,time')
	// 	.eq('user_id', userSession.user.id)
	// 	.eq('date', dayjs().utc().local().format());

	// fetching weekly data

	// const { data: weekEData } = await supabase
	// 	.from('expense')
	// 	.select('article,price,qty,date,time')
	// 	.eq('user_id', userSession.user.id)
	// 	.gte('date', weekDate)
	// 	.lte('date', dayjs().utc().local().format());

	// fetching monthly data

	// const { data: monthEData } = await supabase
	// 	.from('expense')
	// 	.select('article,price,qty,date,time')
	// 	.eq('user_id', userSession.user.id)
	// 	.gte('date', monthDate)
	// 	.lte('date', dayjs().utc().local().format());

	// Fetching daily total expense

	// const { data: daytotalExpense } = await supabase.rpc('calculate_daily_total_expense', {
	// 	p_user_id: userSession.user.id,
	// 	todaydate: dayjs().utc().local().format()
	// });

	// fetching total weekly expense

	// const { data: weekTotalExpense } = await supabase.rpc('calculate_weekly_total_expense', {
	// 	u_user_id: userSession.user.id,
	// 	sdate: weekDate,
	// 	edate: dayjs().utc().local().format()
	// });

	// fetching total monthly income

	// const { data: monthTotalExpense } = await supabase.rpc('calculate_monthly_total_expense', {
	// 	u_user_id: userSession.user.id,
	// 	sdate: monthDate,
	// 	edate: dayjs().utc().local().format()
	// });

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
