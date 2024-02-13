import { db } from "../db";
import { articles } from "../db/schema/articles";
import { eq } from "drizzle-orm";

export const getAllArticles = async () => {
  return await db.query.articles.findMany({
    with: { author: true },
  });
};

export const getArticleById = async (id: string) => {
  return (await db.select().from(articles).where(eq(articles.id, id)))[0];
};
