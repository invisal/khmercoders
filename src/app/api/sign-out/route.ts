import { revalidatePath } from "next/cache";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth/lucia";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);

  // check if user is authenticated
  const session = await authRequest.validate();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);

  // delete session cookie
  authRequest.setSession(null);

  revalidatePath("/sign-in", "layout");

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/sign-in",
    },
  });
};
