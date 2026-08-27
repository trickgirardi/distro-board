import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { env } from '$env/dynamic/private';
import { setSessionCookie } from '$lib/server/auth/cookie';
import { createSession } from '$lib/server/auth/session';
import { createUser } from '$lib/server/auth/user';
import { createDb } from '$lib/server/db/client';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const email = String(form.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(form.get('password') ?? '');

		if (!name || !email || !password) {
			return fail(400, { error: 'Preencha todos os campos.', name, email });
		}

		if (password.length < 8) {
			return fail(400, { error: 'A senha precisa ter pelo menos 8 caracteres.', name, email });
		}

		const db = createDb(env.DATABASE_URL);
		const user = await createUser(db, { name, email, password });

		if (!user) {
			return fail(409, { error: 'Esse e-mail já está cadastrado.', name, email });
		}

		const { token } = await createSession(db, user.id);
		setSessionCookie(cookies, token);

		redirect(303, resolve('/'));
	}
};
