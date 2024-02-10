"use client";

import { useEffect, useRef } from "react";
import Editorjs from "@editorjs/editorjs";
import { tools } from "./tools";

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

  return <div id={EDITOR_ID} />;
};
