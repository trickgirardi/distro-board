import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { SESSION_COOKIE } from '$lib/server/auth/cookie';
import { validateSession } from '$lib/server/auth/session';
import { createDb } from '$lib/server/db/client';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(SESSION_COOKIE);

	if (token) {
		try {
			const db = createDb(env.DATABASE_URL);
			const result = await validateSession(db, token);
			event.locals.user = result
				? { id: result.user.id, name: result.user.name, email: result.user.email }
				: null;
		} catch {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
