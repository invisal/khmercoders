import * as context from "next/headers";
import type { NextRequest } from "next/server";

import { githubAuth } from "@/lib/auth/lucia";

export const GET = async (request: NextRequest) => {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  // store state
  context.cookies().set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
    sameSite: "strict",
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
