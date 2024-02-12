import { env } from "@/lib/env";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const sqlite = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(sqlite);
