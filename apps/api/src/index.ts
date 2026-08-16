import { Hono } from "hono";
import { neon } from "@neondatabase/serverless";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

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
    const sql = neon(c.env.DATABASE_URL);
    const [{ ok }] = await sql`SELECT 1 AS ok`;

    return c.json({
      status: ok === 1 ? "healthy" : "unhealthy",
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

export default app;
