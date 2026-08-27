import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { env } from '$env/dynamic/private';
import { clearSessionCookie, SESSION_COOKIE } from '$lib/server/auth/cookie';
import { invalidateSession } from '$lib/server/auth/session';
import { createDb } from '$lib/server/db/client';

export const actions = {
	default: async ({ cookies }) => {
		const token = cookies.get(SESSION_COOKIE);

		if (token) {
			try {
				await invalidateSession(createDb(env.DATABASE_URL), token);
			} catch {
				// Cookie gets cleared below regardless — a failed DB delete just leaves a stale row to expire.
			}
		}

		clearSessionCookie(cookies);
		redirect(303, resolve('/'));
	}
};
