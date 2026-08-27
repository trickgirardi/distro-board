import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { distroArchitectures, distroTags, distroTargetAudiences } from '../../db/schema';
import type { DistroRelations } from '../distros.schemas';

export async function replaceDistroRelations(
	db: ReturnType<typeof createDb>,
	distroId: string,
	{ architectures, targetAudiences, tags }: DistroRelations
) {
	await db.delete(distroArchitectures).where(eq(distroArchitectures.distroId, distroId));
	await db.delete(distroTargetAudiences).where(eq(distroTargetAudiences.distroId, distroId));
	await db.delete(distroTags).where(eq(distroTags.distroId, distroId));

	if (architectures.length > 0) {
		await db
			.insert(distroArchitectures)
			.values(architectures.map((architecture) => ({ distroId, architecture })));
	}

	if (targetAudiences.length > 0) {
		await db
			.insert(distroTargetAudiences)
			.values(targetAudiences.map((targetAudience) => ({ distroId, targetAudience })));
	}

	if (tags.length > 0) {
		await db.insert(distroTags).values(tags.map((tag) => ({ distroId, tag })));
	}
}
