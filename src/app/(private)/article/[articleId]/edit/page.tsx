"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { CompleteArticle } from "@/lib/query/article";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

import { Navbar } from "./(components)/navbar";
import { QuickProvider } from "@/contexts/quick";
import { OutputData } from "@editorjs/editorjs";
import type Editorjs from "@editorjs/editorjs";

export interface EditPageContext {
  output: OutputData;
  isSaving: boolean;
  article: CompleteArticle;
}

const EditorWithLoading = dynamic(
  () => import("@/components/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  },
);

interface EditArticlePageProps {
  params: { articleId: string };
}

export default function EditArticlePage(prop: EditArticlePageProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [output, setOutput] = useState<OutputData>({ blocks: [] });
  const [isLoading, setIsLoading] = useState(true);

  const [article, setArticle] = useState<CompleteArticle>({
    id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
    description: null,
    slug: "",
    cover: null,
    viewCount: 0,
    author: {
      id: "",
      name: "",
      username: "",
      email: "",
      avatar: null,
      about: null,
      createdAt: "",
      updatedAt: "",
    },
  });

  let { articleId } = prop.params;

  const fetchArticle = useCallback(
    async (articleId: string) => {
      setIsLoading(true);
      const response = await fetch(`/api/article/${articleId}`);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(
          `Failed to fetch article with status: ${response.status}`,
        );
      }

      const articleData = await response.json();
      setArticle(articleData);
      if (articleData.content) {
        const content = JSON.parse(articleData.content);
        setOutput(content);
      }

      setIsLoading(false);
    },

    [setOutput],
  );

  useEffect(() => {
    fetchArticle(articleId);
  }, [articleId, fetchArticle]);

  const toggleIsSaving = () => setIsSaving((prev) => !prev);

  const handleOnChange = useDebounceCallback(async (editor: Editorjs) => {
    toggleIsSaving();
    const newOutput = await editor.save();
    setOutput(newOutput);
    toggleIsSaving();
  }, 300);

  return (
    <QuickProvider value={{ output, isSaving, article }}>
      <div className="mx-auto max-w-[80ch]">
        <Navbar />
        <main className="p-10">
          {isLoading ? (
            <p>Loading article...</p>
          ) : (
            <EditorWithLoading
              data={output}
              onChange={handleOnChange}
              autofocus
            />
          )}
        </main>
      </div>
    </QuickProvider>
  );
}
