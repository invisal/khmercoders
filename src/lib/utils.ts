import { env } from "./env.mjs";
import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import baseSlugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export type Action = "create" | "update" | "delete";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};

/**
 * Join everything together into a string
 *
 * @example
 * const result = concat("henlo", "-", "world")
 * // "henlo-world"
 */
export function concat(...inputs: string[]) {
  return inputs.join("");
}

/**
 * Get the file url from the filename
 * @example
 * const url = getFileUrl("filename.jpg")
 * // "https://r2.example.com/filename.jpg"
 * // make sure to set the R2_PUBLIC_URL in the .env
 */
export function getFileUrl(filename: string) {
  const url = new URL(filename, env.R2_PUBLIC_URL);
  return url.toString();
}

/**
 * Slugify a string to make it URL friendly
 * @example
 * const slug = slugify("He_llo \@Worl/d")
 * // "hello-world"
 */
export function slugify(input: string) {
  return baseSlugify(input, {
    lower: true,
    strict: true,
  });
}
