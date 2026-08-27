import { eq } from 'drizzle-orm';
import type { createDb } from '$lib/server/db/client';
import { users } from '$lib/server/db/schema';
import { hashPassword } from './password';

export async function getUserByEmail(db: ReturnType<typeof createDb>, email: string) {
	const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
	return user ?? null;
}

export type CreateUserInput = { name: string; email: string; password: string };

/** Creates a user with a hashed password. Returns `null` if the e-mail is already registered. */
export async function createUser(db: ReturnType<typeof createDb>, input: CreateUserInput) {
	const existing = await getUserByEmail(db, input.email);
	if (existing) {
		return null;
	}

	const passwordHash = await hashPassword(input.password);
	const [created] = await db
		.insert(users)
		.values({ name: input.name, email: input.email, passwordHash })
		.returning();

	if (!created) {
		throw new Error('Could not create user.');
	}

	return created;
}
