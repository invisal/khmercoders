import { cache } from "react";

import { db } from "../db";
import { articles } from "../db/schema/articles";
import { eq } from "drizzle-orm";

export type CompleteArticle = Awaited<
  ReturnType<typeof getAllArticles>
>[number];

export const getAllArticles = async () => {
  return db.query.articles.findMany({
    with: { author: true },
  });
};

export async function getLatestArticles({ limit = 10, offset = 0 }) {
  return db.query.articles.findMany({
    with: { author: true },
    orderBy: (articles, { desc }) => [desc(articles.createdAt)],
    limit,
    offset,
  });
}

export const getArticleById = cache(async (id: string) => {
  return db.query.articles.findFirst({
    where: (field, op) => op.eq(field.id, id),
    with: { author: true },
  });
});
export async function updateArticleById(
  id: string,
  updatedData: Partial<CompleteArticle>,
) {
  return await db.update(articles).set(updatedData).where(eq(articles.id, id));
}
