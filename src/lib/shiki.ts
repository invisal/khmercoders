import { ALLOW_LANG } from "@/config/allow-lang";

import { getHighlighter } from "shiki";

export const code = async (code: string, language: string) => {
  const highlighter = await getHighlighter({
    themes: ["dracula", "github-light"],
    langs: ALLOW_LANG,
  });
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: "dracula",
      light: "github-light",
    },
  });
};
