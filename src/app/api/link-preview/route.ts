import { NextRequest, NextResponse } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";

import urlMetaData from "url-metadata";

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const url = request.nextUrl.searchParams.get("url");

    const metadata = await urlMetaData(url);

    const response = {
      success: 1,
      meta: {
        title: metadata.title,
        description: metadata.description,
        image: {
          url: metadata["og:image"],
        },
      },
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
