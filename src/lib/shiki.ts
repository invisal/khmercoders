import { getHighlighter } from "shiki";

export const code = async (code: string, language: string, theme: string) => {
  const highlighter = await getHighlighter({
    themes: ["dracula", "nord", "tokyo-night"],
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
    theme,
  });
};
