import { articles, articlesRelations } from "./articles";
import * as userSchema from "./auth";

export const schema = {
  ...userSchema,

  articles,
  articlesRelations,
};
