import { Hono } from "hono";
import { sql } from "drizzle-orm";
import { createDb } from "./db/client";
import { distrosRoutes } from "./modules/distros/distros.routes";
import type { AppEnv } from "./types";

const app = new Hono<AppEnv>();

app.get("/", (c) => {
  return c.json({
    name: "DistroBoard API",
    status: "ok",
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "healthy",
  });
});

app.get("/health/database", async (c) => {
  try {
    const db = createDb(c.env.DATABASE_URL);
    await db.execute(sql`SELECT 1`);

    return c.json({
      status: "healthy",
      database: "connected",
    });
  } catch {
    return c.json(
      {
        status: "unhealthy",
        database: "unavailable",
      },
      503,
    );
  }
});

app.route("/distros", distrosRoutes);

export default app;
