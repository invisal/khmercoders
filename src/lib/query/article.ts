import { cache } from "react";

import { db } from "../db";
import { getUserByUsername } from "./user";

export type CompleteArticle = Awaited<
  ReturnType<typeof getAllArticles>
>[number];

export const getAllArticles = async () => {
  return db.query.articles.findMany({
    with: { author: true },
  });
};

export const getArticleById = cache(async (id: string) => {
  return db.query.articles.findFirst({
    where: (field, op) => op.eq(field.id, id),
    with: { author: true },
  });
});

export const getArticlesByUsername = async (
  username: string,
  limit = 10,
  offset = 0,
) => {
  const user = await getUserByUsername(username);

  if (!user) {
    return null; // or throw an error here later ok, ave?
  }

  const articles = await db.query.articles.findMany({
    where: (articles, { eq }) => eq(articles.userId, user.id),
    limit,
    offset,
    orderBy: (articles, { desc }) => [desc(articles.createdAt)],
    with: { author: true },
  });

  return articles;
};
