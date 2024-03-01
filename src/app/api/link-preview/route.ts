import { NextRequest, NextResponse } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";

import metaScraper from "open-graph-scraper";

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const domain = new URL(url).origin;

  return metaScraper({ url: url })
    .then((data) => {
      const { error, result } = data;

      if (error) {
        console.error("Error fetching metadata:", error);
        return NextResponse.json({ error: error }, { status: 500 });
      }

      let imageUrl =
        (result.ogImage && result.ogImage[0]?.url) || result.favicon || "";

      if (imageUrl.startsWith("/")) {
        imageUrl = domain + imageUrl;
      }

      const response = {
        success: 1,
        link: url,
        meta: {
          title: result.ogTitle || "",
          description: result.ogDescription || "",
          image: {
            url: imageUrl,
          },
        },
      };

      return NextResponse.json(response);
    })
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    });
}
