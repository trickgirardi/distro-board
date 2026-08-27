import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/** Creates a Drizzle client for the request-scoped Neon connection string. */
export function createDb(databaseUrl: string) {
	return drizzle({ client: neon(databaseUrl) });
}
