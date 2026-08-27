import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { env } from '$env/dynamic/private';
import { setSessionCookie } from '$lib/server/auth/cookie';
import { verifyPassword } from '$lib/server/auth/password';
import { createSession } from '$lib/server/auth/session';
import { getUserByEmail } from '$lib/server/auth/user';
import { createDb } from '$lib/server/db/client';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(form.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Preencha e-mail e senha.', email });
		}

		const db = createDb(env.DATABASE_URL);
		const user = await getUserByEmail(db, email);
		const valid = user ? await verifyPassword(password, user.passwordHash) : false;

		if (!user || !valid) {
			return fail(401, { error: 'Credenciais inválidas.', email });
		}

		const { token } = await createSession(db, user.id);
		setSessionCookie(cookies, token);

		redirect(303, resolve('/'));
	}
};
