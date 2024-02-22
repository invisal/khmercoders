import { cache } from "react";

import { db } from "../db";

export type CompleteArticle = Awaited<
  ReturnType<typeof getAllArticles>
>[number];

export const getAllArticles = async () => {
  return db.query.articles.findMany({
    with: { author: true },
  });
};

export const getLatestArticles = async () => {
  return db.query.articles.findMany({
    with: { author: true },
    orderBy: (articles, { desc }) => [desc(articles.createdAt)],
    limit: 6,
  });
};

export const getArticleById = cache(async (id: string) => {
  return db.query.articles.findFirst({
    where: (field, op) => op.eq(field.id, id),
    with: { author: true },
  });
});
