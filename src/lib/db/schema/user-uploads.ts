import { timestamps } from "../../utils";
import { users } from "./auth";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userUploads = sqliteTable(
  "user_uploads",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),

    filename: text("filename").notNull(),

    /**
     * The hashed file content
     */
    hash: text("hash").notNull(),

    /**
     * The size of the file in bytes
     */
    size: integer("size").notNull(),

    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    pk: primaryKey({
      name: "id",
      columns: [table.userId, table.hash],
    }),
  }),
);

// RELATIONS
export const userUploadsRelations = relations(userUploads, ({ one }) => ({
  user: one(users, {
    fields: [userUploads.userId],
    references: [users.id],
  }),
}));

// SCHEMAS
const baseSchema = createSelectSchema(userUploads).omit(timestamps);
export const insertUserUploadSchema =
  createInsertSchema(userUploads).omit(timestamps);
export const insertUserUploadParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});
export const updateUserUploadSchema = baseSchema;
export const updateUserUploadParams = baseSchema.extend({}).omit({
  userId: true,
});

// TYPES
export type UserUpload = typeof userUploads.$inferSelect;
export type NewUserUpload = z.infer<typeof insertUserUploadSchema>;
export type NewUserUploadParams = z.infer<typeof insertUserUploadParams>;
export type UpdateUserUploadParamas = z.infer<typeof updateUserUploadParams>;
