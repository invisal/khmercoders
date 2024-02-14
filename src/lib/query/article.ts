import { db } from "../db";

export type CompleteArticle = Awaited<
  ReturnType<typeof getAllArticles>
>[number];

export const getAllArticles = async () => {
  return db.query.articles.findMany({
    with: { author: true },
  });
};

export const getArticleById = async (id: string) => {
  return db.query.articles.findFirst({
    where: (field, op) => op.eq(field.id, id),
    with: { author: true },
  });
};
