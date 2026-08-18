import { eq } from "drizzle-orm";
import { createDb } from "../../../db/client";
import {
  distroArchitectures,
  distroTags,
  distroTargetAudiences,
  distros,
} from "../../../db/schema";

export async function getDistro(db: ReturnType<typeof createDb>, slug: string) {
  const [distro] = await db.select().from(distros).where(eq(distros.slug, slug)).limit(1);

  if (!distro) {
    return null;
  }

  const [architectures, targetAudiences, tags] = await Promise.all([
    db
      .select({ architecture: distroArchitectures.architecture })
      .from(distroArchitectures)
      .where(eq(distroArchitectures.distroId, distro.id)),
    db
      .select({ targetAudience: distroTargetAudiences.targetAudience })
      .from(distroTargetAudiences)
      .where(eq(distroTargetAudiences.distroId, distro.id)),
    db.select({ tag: distroTags.tag }).from(distroTags).where(eq(distroTags.distroId, distro.id)),
  ]);

  return {
    ...distro,
    architectures: architectures.map((item) => item.architecture),
    targetAudiences: targetAudiences.map((item) => item.targetAudience),
    tags: tags.map((item) => item.tag),
  };
}
