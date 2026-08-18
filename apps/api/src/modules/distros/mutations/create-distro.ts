import { eq } from "drizzle-orm";
import { createDb } from "../../../db/client";
import { distros } from "../../../db/schema";
import type { DistroInput } from "../distros.schemas";
import { getDistro } from "../queries/get-distro";
import { replaceDistroRelations } from "./replace-distro-relations";

export async function createDistro(db: ReturnType<typeof createDb>, input: DistroInput) {
  const [existing] = await db.select({ id: distros.id }).from(distros).where(eq(distros.slug, input.slug)).limit(1);

  if (existing) {
    return null;
  }

  const { architectures, targetAudiences, tags, ...distroData } = input;
  const [created] = await db.insert(distros).values(distroData).returning({ id: distros.id });

  if (!created) {
    throw new Error("Could not create distro.");
  }

  await replaceDistroRelations(db, created.id, { architectures, targetAudiences, tags });
  return getDistro(db, input.slug);
}
