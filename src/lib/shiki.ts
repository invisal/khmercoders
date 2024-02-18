import { getHighlighter } from "shiki";

export const code = async (code: string, language: string) => {
  const highlighter = await getHighlighter({
    themes: ["dracula", "github-light"],
    langs: [
      "javascript",
      "typescript",
      "html",
      "css",
      "json",
      "markdown",
      "plaintext",
    ],
  });
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: "dracula",
      light: "github-light",
    },
  });
};
