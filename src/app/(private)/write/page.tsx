"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { DEFAULT_BLOCKS } from "@/config/default-blocks";
import { DRAFT_KEY } from "@/config/keys";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

import { Navbar } from "./(components)/navbar";
import { QuickProvider } from "@/contexts/quick";
import { OutputData } from "@editorjs/editorjs";
import type Editorjs from "@editorjs/editorjs";
import { useLocalStorage } from "@mantine/hooks";

const Editor = dynamic(
  () => import("@/components/editor").then(mod => mod.Editor),
  { ssr: false },
);

export interface WritePageContext {
  output: OutputData;
  isSaving: boolean;
}

export default function WritePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [output, setOutput] = useLocalStorage<OutputData>({
    key: DRAFT_KEY,
    defaultValue: DEFAULT_BLOCKS,
  });

  const toggleIsSaving = () => setIsSaving(prev => !prev);

  const handleOnChange = useDebounceCallback(async (editor: Editorjs) => {
    toggleIsSaving();
    const newOutput = await editor.save();
    setOutput(newOutput);
    toggleIsSaving();
  }, 300);

  return (
    <QuickProvider value={{ output, isSaving }}>
      <div className="mx-auto max-w-[80ch]">
        <Navbar />
        <main className="p-10">
          <Editor data={output} onChange={handleOnChange} autofocus />
        </main>
      </div>
    </QuickProvider>
  );
}
