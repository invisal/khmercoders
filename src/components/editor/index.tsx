"use client";

import "./style.css";

import { useCallback, useEffect, useRef } from "react";

import { tools } from "./tools";
import Editorjs from "@editorjs/editorjs";
// @ts-expect-error - no types
import DragDrop from "editorjs-drag-drop";
// @ts-expect-error - no types
import Undo from "editorjs-undo";

export const EDITOR_ID = "@editorjs";

export const Editor = () => {
  const editor = useRef<Editorjs | null>(null);

  const onReady = useCallback(() => {
    new Undo({ editor: editor.current });
    new DragDrop(editor.current);
  }, [editor]);

  const onChange = useCallback(async () => {
    const output = await editor.current?.save();
    console.log({ output });
  }, [editor]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (editor.current) return;

    editor.current = new Editorjs({
      holder: EDITOR_ID,
      autofocus: true,
      placeholder: "Write something...",
      tools: tools,
      inlineToolbar: ["link", "inlineCode"],
      onReady: onReady,
      onChange: onChange,
    });

    return () => {
      editor?.current?.destroy?.();
      editor.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={EDITOR_ID}
      className=" dark:prose-invert prose-orange mx-auto max-w-[80ch] space-y-0"
    />
  );
};
