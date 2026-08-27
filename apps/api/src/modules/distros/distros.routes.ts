import { Hono } from "hono";
import { createDb } from "../../db/client";
import type { AppEnv } from "../../types";
import { createDistro } from "./mutations/create-distro";
import { deleteDistro } from "./mutations/delete-distro";
import { updateDistro } from "./mutations/update-distro";
import { isDistroInput, isDistroUpdate } from "./distros.schemas";
import { getDistro } from "./queries/get-distro";
import { listDistros, parseListDistrosFilters } from "./queries/list-distros";

export const distrosRoutes = new Hono<AppEnv>();

distrosRoutes.get("/", async (c) => {
  const filters = parseListDistrosFilters({
    search: c.req.query("search"),
    base: c.req.query("base"),
    releaseModel: c.req.query("releaseModel"),
    desktopEnvironment: c.req.query("desktopEnvironment"),
    packageManager: c.req.query("packageManager"),
    architecture: c.req.query("architecture"),
    targetAudience: c.req.query("targetAudience"),
    tag: c.req.query("tag"),
  });

  return c.json(await listDistros(createDb(c.env.DATABASE_URL), filters));
});

distrosRoutes.get("/:slug", async (c) => {
  const distro = await getDistro(createDb(c.env.DATABASE_URL), c.req.param("slug"));

  if (!distro) {
    return c.json({ error: "Distro not found" }, 404);
  }

  return c.json(distro);
});

distrosRoutes.post("/", async (c) => {
  const body: unknown = await c.req.json().catch(() => null);

  if (!isDistroInput(body)) {
    return c.json({ error: "Invalid distro payload" }, 400);
  }

  const distro = await createDistro(createDb(c.env.DATABASE_URL), body);

  if (!distro) {
    return c.json({ error: "A distro with this slug already exists" }, 409);
  }

  return c.json(distro, 201);
});

distrosRoutes.put("/:slug", async (c) => {
  const body: unknown = await c.req.json().catch(() => null);

  if (!isDistroUpdate(body)) {
    return c.json({ error: "Invalid distro payload" }, 400);
  }

  const distro = await updateDistro(createDb(c.env.DATABASE_URL), c.req.param("slug"), body);

  if (!distro) {
    return c.json({ error: "Distro not found" }, 404);
  }

  return c.json(distro);
});

distrosRoutes.delete("/:slug", async (c) => {
  const deleted = await deleteDistro(createDb(c.env.DATABASE_URL), c.req.param("slug"));

  if (!deleted) {
    return c.json({ error: "Distro not found" }, 404);
  }

  return c.body(null, 204);
});
