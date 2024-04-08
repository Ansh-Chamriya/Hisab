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
	const wd = dayjs().startOf('w').add(1, 'day').utc().local();
	const md = dayjs().startOf('M').utc().local();
	const weekDate = dayjs.tz(wd, 'Asia/Kolkata').format();
	const monthDate = dayjs.tz(md, 'Asia/Kolkata').format();

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
			.select('article,price,qty,time,date,income_id')
			.eq('user_id', userSession.user.id)
			.eq('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('income')
			.select('article,price,qty,date,time,income_id')
			.eq('user_id', userSession.user.id)
			.gte('date', weekDate)
			.lte('date', dayjs.tz(d, 'Asia/Kolkata').format()),
		supabase
			.from('income')
			.select('article,price,qty,date,time,income_id')
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
export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const newPrice = formData.get('updatePrice');
		const newQty = formData.get('articleQty');
		const incomeId = formData.get('incomeId');
		const { data, error } = await supabase
			.from('income')
			.update({ price: newPrice, qty: newQty })
			.eq('income_id', incomeId)
			.select();
		console.log(data, error);
	}
};
