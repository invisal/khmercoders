import { NextResponse } from "next/server";

import { getPageSession } from "@/lib/auth/lucia";

export async function GET() {
  const session = await getPageSession();

  console.log(session?.user, "here");

  if (!session?.user.isWritable) {
    return new Response(null, { status: 401 });
  }
}
