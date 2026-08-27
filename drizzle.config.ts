import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: ['.env.local', '.env'] });

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		// Migrations require a direct Neon connection, not the pooled application URL.
		url: process.env.DATABASE_URL_UNPOOLED!
	}
});
