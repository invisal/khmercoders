import { NextRequest } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { articles, insertArticleSchema } from "@/lib/db/schema/articles";
import { concat, nanoid, slugify } from "@/lib/utils";

import { err, isErr, ok } from "@justmiracle/result";

export const POST = async (request: NextRequest) => {
  // get the body of the request, this is `any` by default
  const body = await request.json();

  // validate auth
  const { session } = await getUserAuth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const articleId = nanoid(6);

  // we might allow user to set their own slug?
  const slug = concat(slugify(body.slug || body.title), "-", articleId);

  // validate the body of the request
  const values = insertArticleSchema.safeParse({
    ...body,
    id: articleId,
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
