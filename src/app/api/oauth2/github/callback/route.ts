import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";

import { auth, githubAuth } from "@/lib/auth/lucia";

import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("github_oauth_state")?.value;
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);
    const getUser = async () => {
      const existingUser = await getExistingUser();
      //TO DO , If user already exist , update thier information (example pfp)
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: githubUser.login,
          name: githubUser.name || "",
          email: githubUser.email || "",
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
