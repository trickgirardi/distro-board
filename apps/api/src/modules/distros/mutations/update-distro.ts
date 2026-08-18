import { eq } from "drizzle-orm";
import { createDb } from "../../../db/client";
import { distros } from "../../../db/schema";
import type { DistroUpdate } from "../distros.schemas";
import { getDistro } from "../queries/get-distro";
import { replaceDistroRelations } from "./replace-distro-relations";

export async function updateDistro(db: ReturnType<typeof createDb>, slug: string, input: DistroUpdate) {
  const { architectures, targetAudiences, tags, ...distroData } = input;
  const [updated] = await db
    .update(distros)
    .set(distroData)
    .where(eq(distros.slug, slug))
    .returning({ id: distros.id, slug: distros.slug });

  if (!updated) {
    return null;
  }

  await replaceDistroRelations(db, updated.id, { architectures, targetAudiences, tags });
  return getDistro(db, updated.slug);
}
