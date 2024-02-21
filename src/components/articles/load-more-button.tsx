"use client";

import React, { useState } from "react";

import ArticlePreview from "./article-preview";

const LoadMoreArticles = ({ username }: { username: string }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [offset, setOffset] = useState(10);
  const [hasMore, setHasMore] = useState(false);

  const loadArticles = async () => {
    //this should be /api/articles?
    const response = await fetch(
      `/api/article?username=${username}&limit=10&offset=${offset}`,
    );
    if (response.ok) {
      const newArticles = await response.json();
      setArticles((prev) => [...prev, ...newArticles]);
      setOffset((prev) => prev + newArticles.length);

      setHasMore(newArticles.length === 10);
    }
  };

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
      {hasMore && <button onClick={loadArticles}>Load More</button>}
    </>
  );
};

export default LoadMoreArticles;
