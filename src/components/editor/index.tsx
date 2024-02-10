"use client";

import { useEffect, useRef } from "react";
import Editorjs from "@editorjs/editorjs";
import { tools } from "./extensions";

export const EDITOR_ID = "@editorjs";

export const Editor = () => {
  const editor = useRef<Editorjs | null>(null);

  useEffect(() => {
    if (editor.current) return;

    editor.current = new Editorjs({
      holder: EDITOR_ID,
      autofocus: true,
      placeholder: "Write something...",
      tools: tools,
      onReady: () => {
        editor.current = editor.current;
      },
    });

    return () => {
      editor?.current?.destroy?.();
      editor.current = null;
    };
  }, []);

  return <div id={EDITOR_ID} />;
};
