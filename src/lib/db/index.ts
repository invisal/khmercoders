import { env } from "@/lib/env.mjs";

import { articles } from "./schema/articles";
import { users } from "./schema/auth";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const sqlite = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(sqlite, {
  schema: { articles: articles, users: users },
});
