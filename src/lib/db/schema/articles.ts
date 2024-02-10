import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getArticles } from "@/lib/api/articles/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const articles = sqliteTable("articles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Schema for articles - used to validate API requests
const baseSchema = createSelectSchema(articles).omit(timestamps);

export const insertArticleSchema =
  createInsertSchema(articles).omit(timestamps);
export const insertArticleParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateArticleSchema = baseSchema;
export const updateArticleParams = baseSchema.extend({}).omit({
  userId: true,
});
export const articleIdSchema = baseSchema.pick({ id: true });

// Types for articles - used to type API request params and within Components
export type Article = typeof articles.$inferSelect;
export type NewArticle = z.infer<typeof insertArticleSchema>;
export type NewArticleParams = z.infer<typeof insertArticleParams>;
export type UpdateArticleParams = z.infer<typeof updateArticleParams>;
export type ArticleId = z.infer<typeof articleIdSchema>["id"];

// this type infers the return from getArticles() - meaning it will include any joins
export type CompleteArticle = Awaited<
  ReturnType<typeof getArticles>
>["articles"][number];
