# KhmerCode Blog

A unified blogging platform for khmer coders.

### Setup

1. Clone the repo

2. Update the `.env`

You can create a free turso account use a serverless Squealite DB.
Where you need to add into your `.env`:

- `DATABASE_URL`
- `DATABASE_AUTH_TOKEN`

Or you can create a `dev.db` file in the root directory then in your `.env` just add
`DATABASE_URL="file:./dev.db"`, you can change the database name to wutever u like

3. Installation and Development

```sh
# oh u dont have pnpm?
corepack enable pnpm

# use it, it's faster 😂

# Install deps
pnpm install

# Run migration
pnpm run db:generate
pnpm run db:migrate

# Run dev server
pnpm dev
```

### DB and Schema

You can find the db tables and schemas in `@/lib/db`, there we define the table for our database
and we directly infer validation schema from it.

You may check the docs for the ORM and Validator:

- [DrizzleORM](https://orm.drizzle.team)
- [Zod](https://zod.dev/)

```ts
// This is a reference from the `Article` schema

// 1. First we define the table
export const articles = sqliteTable("articles", {
  id: text("id")
    .primaryKey()
    // this auto generate UUID using our custom nanoid function
    .$defaultFn(() => nanoid()),

  userId: text("user_id")
    .notNull()
    // this tie the relationship back to `users`
    .references(() => users.id),

  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  cover: text("cover"),

  // auto generate timestamps
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// 2. We define the validation schema
// First we create a base schema for the articles table
// Note that we omit the timestamps from the base schema
const baseSchema = createSelectSchema(articles).omit(timestamps);

// Then we create the insert schema which also omits the timestamps
export const insertArticleSchema =
  createInsertSchema(articles).omit(timestamps);

// This is the schema we use to validate on the client side
// it doesnt need to include the id or userId
export const insertArticleParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

// The update schema is the same as the base schema
export const updateArticleSchema = baseSchema;

// Same thing here we exclude the userId from the params cuz this will be used client side
export const updateArticleParams = baseSchema.extend({}).omit({
  userId: true,
});

// 3. We infer the type and export them
// Types for articles - used to type API request params and within Components
export type Article = typeof articles.$inferSelect;
export type NewArticle = z.infer<typeof insertArticleSchema>;
export type NewArticleParams = z.infer<typeof insertArticleParams>;
export type UpdateArticleParams = z.infer<typeof updateArticleParams>;
```

### Auth

Currently we export 2 functions for checking Auth

`checkAuth` and `getUserAuth`

- `checkAuth(): Promise<void>` will redirect to `/sign-in` if not logged in
- `getUserAuth(): Promise<Session>` will return `Session`, you can handle redirect manually

```ts
// Example

// write/page.tsx
const WritePage = async () => {
  // this will check for auth and redirect if not logged in
  await checkAuth()

  return (
    // ...
  )
}

// index/page.tsx
const HomePage = async () => {
  const session = await getUserAuth()

  if (!session.session) {
    // meaning not logged in
    // you can do wutever u want here
    // return redirect('/sign-in')
  }

  // you can check the session which contain some user information
  return (
    <div>
      {JSON.stringify(session.session, null, 2)}
    </div>
  )
}

```

More docs to come...
