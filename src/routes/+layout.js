import { PUBLIC_DATABASE_ANON_KEY, PUBLIC_DATABASE_URL } from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();
inject({ mode: dev ? 'development' : 'production' });
export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_DATABASE_URL, PUBLIC_DATABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
