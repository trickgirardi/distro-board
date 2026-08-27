import { eq } from 'drizzle-orm';
import type { createDb } from '$lib/server/db/client';
import { sessions, users } from '$lib/server/db/schema';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/** Generates an opaque, high-entropy token to use as both the session id and the cookie value. */
export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return btoa(String.fromCharCode(...bytes))
		.replaceAll('+', '-')
		.replaceAll('/', '_')
		.replaceAll('=', '');
}

export async function createSession(db: ReturnType<typeof createDb>, userId: string) {
	const token = generateSessionToken();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

	await db.insert(sessions).values({ id: token, userId, expiresAt });

	return { token, expiresAt };
}

/** Looks up a session by its token, returning the associated user or `null` if missing/expired. */
export async function validateSession(db: ReturnType<typeof createDb>, token: string) {
	const [row] = await db
		.select({ session: sessions, user: users })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, token))
		.limit(1);

	if (!row) {
		return null;
	}

	if (row.session.expiresAt.getTime() < Date.now()) {
		await db.delete(sessions).where(eq(sessions.id, token));
		return null;
	}

	return row;
}

export async function invalidateSession(db: ReturnType<typeof createDb>, token: string) {
	await db.delete(sessions).where(eq(sessions.id, token));
}
