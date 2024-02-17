"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { codeToHtml } from "shiki";

export const CodeBlock = async (data: OutputBlockData) => {
  const html = await codeToHtml(data.data.content, {
    lang: data.data.language || "plaintext",
    themes: {
      light: "min-light",
      dark: "min-dark",
    },
  });

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
