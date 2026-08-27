import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { distros } from '../../db/schema';

export async function deleteDistro(db: ReturnType<typeof createDb>, slug: string) {
	const [deleted] = await db
		.delete(distros)
		.where(eq(distros.slug, slug))
		.returning({ id: distros.id });
	return Boolean(deleted);
}
