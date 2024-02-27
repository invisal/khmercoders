import { NextRequest } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";
import { updateArticleSchema } from "@/lib/db/schema/articles";
import { getArticleById, updateArticleById } from "@/lib/query/article";

import { err, isErr, ok } from "@justmiracle/result";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { articleId: string } },
) => {
  const articleId = params.articleId;

  const body = await request.json();

  const { session } = await getUserAuth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const article = await getArticleById(articleId);

  if (!article) {
    return new Response(JSON.stringify({ error: "Article not found" }), {
      status: 404,
    });
  }

  if (article.author.id !== session.user.id) {
    return new Response(
      JSON.stringify({ error: "You are not the author of this article" }),
      { status: 403 },
    );
  }

  const values = updateArticleSchema.safeParse({
    ...body,
  });

  if (!values.success) {
    return new Response(JSON.stringify({ error: values.error }), {
      status: 400,
    });
  }

  // Update the article in the database
  const updatedArticle = await updateArticleById(articleId, values.data)
    .then(ok)
    .catch(err);

  if (isErr(updatedArticle)) {
    return new Response(
      JSON.stringify({ error: updatedArticle.error.message }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify(updatedArticle), { status: 200 });
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { articleId: string } },
) => {
  const articleId = params.articleId;

  const article = await getArticleById(articleId);

  if (!article) {
    return new Response(JSON.stringify({ error: "Article not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(article), { status: 200 });
};
