import { asc } from "drizzle-orm";
import { createDb } from "../../../db/client";
import { distros } from "../../../db/schema";

export async function listDistros(db: ReturnType<typeof createDb>) {
  return db.select().from(distros).orderBy(asc(distros.name));
}
