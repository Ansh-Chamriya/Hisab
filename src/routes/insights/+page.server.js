/** @type {import('./$types').PageServerLoad} */
import supabase from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

export async function load(event) {
	const userSession = await event.locals.getSession();
	dayjs.extend(utc);
	if (!userSession) {
		throw redirect(301, '/login');
	}
	const [
		{ data: IdliInsight },
		{ data: ChutneyInsight },
		{ data: MenduvadaInsight },
		{ data: monthlyIdliInsight },
		{ data: monthlyChutneyInsight },
		{ data: monthlyMenduvadaInsight },
		{ data: weeklyIdliTotal },
		{ data: weeklyChutneyTotal },
		{ data: weeklyMenduvadaTotal },
		{ data: monthlyIdliTotal },
		{ data: monthlyChutneyTotal },
		{ data: monthlyMenduvadaTotal }
	] = await Promise.all([
		supabase.rpc('weekly_Income_Insights', {
			articlename: 'Idli-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('weekly_Income_Insights', {
			articlename: 'Chutney',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('weekly_Income_Insights', {
			articlename: 'Menduvada-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('monthly_Income_insights', {
			articlename: 'Idli-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('monthly_Income_insights', {
			articlename: 'Chutney',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('monthly_Income_insights', {
			articlename: 'Menduvada-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('weekarticletotal', {
			articlename: 'Idli-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('weekarticletotal', {
			articlename: 'Chutney',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('weekarticletotal', {
			articlename: 'Menduvada-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('montharticletotal', {
			articlename: 'Idli-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('montharticletotal', {
			articlename: 'Chutney',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		}),
		supabase.rpc('montharticletotal', {
			articlename: 'Menduvada-khiru',
			userid: userSession.user.id,
			cdate: dayjs().utc().local().format()
		})
	]);
	// const { data: IdliInsight, error } = await supabase.rpc('weekly_Income_Insights', {
	// 	articlename: 'Idli-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: ChutneyInsight } = await supabase.rpc('weekly_Income_Insights', {
	// 	articlename: 'Chutney',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: MenduvadaInsight } = await supabase.rpc('weekly_Income_Insights', {
	// 	articlename: 'Menduvada-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyIdliInsight } = await supabase.rpc('monthly_Income_insights', {
	// 	articlename: 'Idli-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyChutneyInsight } = await supabase.rpc('monthly_Income_insights', {
	// 	articlename: 'Chutney',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyMenduvadaInsight } = await supabase.rpc('monthly_Income_insights', {
	// 	articlename: 'Menduvada-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: weeklyIdliTotal } = await supabase.rpc('weekarticletotal', {
	// 	articlename: 'Idli-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: weeklyChutneyTotal } = await supabase.rpc('weekarticletotal', {
	// 	articlename: 'Chutney',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: weeklyMenduvadaTotal } = await supabase.rpc('weekarticletotal', {
	// 	articlename: 'Menduvada-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyIdliTotal } = await supabase.rpc('montharticletotal', {
	// 	articlename: 'Idli-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyChutneyTotal } = await supabase.rpc('montharticletotal', {
	// 	articlename: 'Chutney',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	// const { data: monthlyMenduvadaTotal } = await supabase.rpc('montharticletotal', {
	// 	articlename: 'Menduvada-khiru',
	// 	userid: userSession.user.id,
	// 	cdate: dayjs().utc().local().format()
	// });
	const Insightdata = [
		[
			{ name: 'Idli-khiru', insight: IdliInsight || 0, articleTotal: weeklyIdliTotal || 0 },
			{
				name: 'Chutney',
				insight: ChutneyInsight || 0,
				articleTotal: weeklyChutneyTotal || 0
			},
			{
				name: 'Menduvada-khiru',
				insight: MenduvadaInsight || 0,
				articleTotal: weeklyMenduvadaTotal || 0
			}
		],
		[
			{
				name: 'Idli-khiru',
				insight: monthlyIdliInsight || 0,
				articleTotal: monthlyIdliTotal || 0
			},
			{
				name: 'Chutney',
				insight: monthlyChutneyInsight || 0,
				articleTotal: monthlyChutneyTotal || 0
			},
			{
				name: 'Menduvada-khiru',
				insight: monthlyMenduvadaInsight || 0,
				articleTotal: monthlyMenduvadaTotal || 0
			}
		]
	];
	return { Insightdata };
}
