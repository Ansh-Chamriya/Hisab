import { createClient } from '@supabase/supabase-js';
import { PUBLIC_DATABASE_URL, PUBLIC_DATABASE_ANON_KEY } from '$env/static/public';
// Create a single supabase client for interacting with your database
export const load = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};

// const supabase = createClient(PUBLIC_DATABASE_URL, PUBLIC_DATABASE_ANON_KEY);

// export default supabase;
