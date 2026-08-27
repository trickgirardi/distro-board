import type { Cookies } from '@sveltejs/kit';

export const SESSION_COOKIE = 'session';

const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, mirrors session.ts's SESSION_DURATION_MS

export function setSessionCookie(cookies: Cookies, token: string) {
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: SESSION_COOKIE_MAX_AGE
	});
}

export function clearSessionCookie(cookies: Cookies) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}
