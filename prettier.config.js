/** @type {import('prettier').Config} */
module.exports = {
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "^types$",
    "^@/types/(.*)$",
    "",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/app/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "",
    "^[./]",
    "<THIRD_PARTY_MODULES>",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};
