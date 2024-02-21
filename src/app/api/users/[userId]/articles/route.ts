import { NextRequest } from "next/server";

import { getArticlesByUserId } from "@/lib/query/article";

import { err, isErr, ok } from "@justmiracle/result";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const { userId } = params;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const result = await getArticlesByUserId(userId, limit, offset)
    .then((articles) => ok(articles))
    .catch((error) => err(error));

  if (isErr(result)) {
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(result.value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
