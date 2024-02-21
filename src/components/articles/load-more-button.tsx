"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import ArticlePreview from "./article-preview";

const LoadMoreArticles = ({
  username,
  initialArticleCount,
}: {
  username: string;
  initialArticleCount: number;
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [offset, setOffset] = useState(10);
  const [hasMore, setHasMore] = useState(initialArticleCount > 9);
  console.log(initialArticleCount);
  const loadArticles = async () => {
    //this should be /api/articles?
    const response = await fetch(
      `/api/article?username=${username}&limit=10&offset=${offset}`,
    );
    if (response.ok) {
      const newArticles = await response.json();
      setArticles((prev) => [...prev, ...newArticles]);
      setOffset((prev) => prev + newArticles.length);

      setHasMore(newArticles.length > 9);
    }
  };

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <Button variant={"outline"} onClick={loadArticles}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default LoadMoreArticles;
