import { NextRequest } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { articles, insertArticleSchema } from "@/lib/db/schema/articles";
import { getArticlesByUsername } from "@/lib/query/article";
import { slugify } from "@/lib/utils";

import { err, isErr, ok } from "@justmiracle/result";

export const POST = async (request: NextRequest) => {
  // get the body of the request, this is `any` by default
  const body = await request.json();

  // validate auth
  const { session } = await getUserAuth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // we might allow user to set their own slug?
  const slug = slugify(body.slug || body.title);

  // validate the body of the request
  const values = insertArticleSchema.safeParse({
    ...body,
    slug: slug,
    userId: session.user.id,
  });
  if (!values.success) {
    return new Response(values.error.message, { status: 400 });
  }

  const article = await db
    .insert(articles)
    .values(values.data)
    .returning()
    // wrap in result type, this is equivalent to a try catch block
    .then(ok)
    .catch(err);

  if (isErr(article))
    return new Response(article.error.message, { status: 400 });

  return new Response(JSON.stringify(article.value[0]), { status: 201 });
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
    });
  }

  const result = await getArticlesByUsername(username, limit, offset)
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
