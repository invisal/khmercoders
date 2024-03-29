import { nanoid, timestamps } from "@/lib/utils";

import { users } from "./auth";
import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const articles = sqliteTable("articles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(6)),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  title: text("title").notNull(),
  description: text("description"),
  slug: text("slug").notNull().default(""),
  content: text("content").notNull(),
  cover: text("cover"),

  viewCount: int("view_count").default(0),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Define relationships
export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.userId],
    references: [users.id],
  }),
}));

// First we create a base schema for the articles table
// Note that we omit the timestamps from the base schema
const baseSchema = createSelectSchema(articles).omit(timestamps);

// Then we create the insert schema which also omits the timestamps
export const insertArticleSchema =
  createInsertSchema(articles).omit(timestamps);

// This is the schema we use to validate on the client side
// it doesnt need to include the id or userId
export const insertArticleParams = baseSchema
  .extend({})
  .omit({
    id: true,
    userId: true,
  })
  .partial({
    slug: true,
  });

// The update schema is the same as the base schema
export const updateArticleSchema = baseSchema;

// Same thing here we exclude the userId from the params cuz this will be used client side
export const updateArticleParams = baseSchema
  .extend({})
  .omit({
    userId: true,
  })
  .partial({
    slug: true,
  });

// Types for articles - used to type API request params and within Components
export type Article = typeof articles.$inferSelect;
export type NewArticle = z.infer<typeof insertArticleSchema>;
export type NewArticleParams = z.infer<typeof insertArticleParams>;
export type UpdateArticleParams = z.infer<typeof updateArticleParams>;
