import { cache } from "react";
import * as context from "next/headers";

import { sqlite } from "@/lib/db/index";

import { users } from "../db/schema/auth";
import { env } from "../env.mjs";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { github } from "@lucia-auth/oauth/providers";
import { lucia, UserSchema } from "lucia";
import { nextjs_future } from "lucia/middleware";

export const auth = lucia({
  adapter: libsql(sqlite, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: { expires: false },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      name: data.name,
      isWritable: data.is_writable > 0,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  redirectUri: process.env.GITHUB_REDIRECT_URI ?? "",
  scope: ["read:user"],
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
