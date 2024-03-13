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

	const { data: IdliInsight, error } = await supabase.rpc('weekly_Income_Insights', {
		articlename: 'Idli-khiru',
		userid: userSession.user.id,
		cdate: dayjs().utc().local().format()
	});
	const { data: ChutneyInsight } = await supabase.rpc('weekly_Income_Insights', {
		articlename: 'Chutney',
		userid: userSession.user.id,
		cdate: dayjs().utc().local().format()
	});
	const { data: MenduvadaInsight } = await supabase.rpc('weekly_Income_Insights', {
		articlename: 'Menduvada-khiru',
		userid: userSession.user.id,
		cdate: dayjs().utc().local().format()
	});
	const Insightdata = [
		{ name: 'Idli-khiru', insight: IdliInsight || 0 },
		{ name: 'Chutney', insight: ChutneyInsight || 0 },
		{ name: 'Menduvada-khiru', insight: MenduvadaInsight || 0 }
	];
	// console.log(dayjs().utc().local().format());
	return { Insightdata };
}
