import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    DATABASE_URL: z.string().min(1),
    DATABASE_AUTH_TOKEN: z.string().min(1),

    R2_URL: z.string().min(1),
    R2_PUBLIC_URL: z.string().min(1),
    R2_BUCKET: z.string().min(1),
    R2_ACCESS_KEY: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
  },

  client: {},

  // runtimeEnv: {
  //   DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   NODE_ENV: process.env.NODE_ENV,
  // },

  isServer: typeof window === "undefined",
  skipValidation: process.env.SKIP_ENV === "true",
});
