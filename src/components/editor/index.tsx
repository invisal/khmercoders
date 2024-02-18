"use client";

import "./style.css";

import { useCallback, useEffect, useRef } from "react";

import { tools } from "./tools";
import Editorjs, { OutputData } from "@editorjs/editorjs";
// @ts-expect-error - no types
import DragDrop from "editorjs-drag-drop";
// @ts-expect-error - no types
import Undo from "editorjs-undo";
import { useTheme } from "next-themes";

export const EDITOR_ID = "@editorjs";

export interface EditorProps {
  onChange?: (editor: Editorjs) => void;
  autofocus?: boolean;
  placeholder?: string;
  data?: OutputData;
}

export const Editor = ({ onChange, ...editorProps }: EditorProps) => {
  const { theme } = useTheme();
  const editor = useRef<Editorjs | null>(null);

  const handleOnReady = useCallback(() => {
    new Undo({ editor: editor.current });
    new DragDrop(editor.current);
  }, [editor]);

  const handleOnChange = useCallback(() => {
    if (!editor.current) return;
    onChange?.(editor.current);
  }, [editor, onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (editor.current) return;

    editor.current = new Editorjs({
      holder: EDITOR_ID,
      autofocus: true,
      placeholder: "Write something...",
      tools: tools,
      onReady: handleOnReady,
      onChange: handleOnChange,
      ...editorProps,
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
      className="prose prose-orange dark:prose-invert"
      data-color-mode={theme}
    />
  );
};
