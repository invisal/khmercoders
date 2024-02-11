"use client";

import "./style.css";

import { useEffect, useRef } from "react";

import { tools } from "./tools";
import Editorjs from "@editorjs/editorjs";

export const EDITOR_ID = "@editorjs";

export const Editor = () => {
  const editor = useRef<Editorjs | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (editor.current) return;

    editor.current = new Editorjs({
      holder: EDITOR_ID,
      autofocus: true,
      placeholder: "Write something...",
      tools: tools,
      onChange: async () => {
        const output = await editor.current?.save();
        console.log({ output });
      },
    });

    return () => {
      editor?.current?.destroy?.();
      editor.current = null;
    };
  }, []);

  return (
    <div
      id={EDITOR_ID}
      className=" dark:prose-invert prose-orange mx-auto max-w-[80ch] space-y-0"
    />
  );
};
