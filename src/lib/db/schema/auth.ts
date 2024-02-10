import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
	id: text("id").primaryKey(),
	// other user attributes
	name: text("name"),
	email: text("email"),
	username: text("username"),
});

export const sessions = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	activeExpires: blob("active_expires", {
		mode: "bigint"
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint"
	}).notNull()
});

export const keys = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	hashedPassword: text("hashed_password")
});
