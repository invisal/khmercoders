import { Metadata } from "next";

import { getArticleById } from "@/lib/query/article";
import { getIdFromSlug } from "@/lib/utils";

import { Article } from "@/components/renderer";

interface ArticlePageProps {
  params: { username: string; slug: string };
}

export async function generateMetadata(
  props: ArticlePageProps,
): Promise<Metadata> {
  const article = await getArticleById(getIdFromSlug(props.params.slug));
  if (!article) {
    throw new Error("Article not found");
  }

  const imageUrl = article.cover || "";
  const author = article.author;

  if (!author) {
    return {};
  }
  return {
    title: article.title,
    description: article.description,
    creator: author.username,
    authors: [
      {
        name: author.username,
        url: `${process.env.SITE_URL}/${author.username}` || "",
      },
    ],
    publisher: "KhmerCoders",
    openGraph: {
      type: "article",
      url: `${process.env.SITE_URL}/${author.username}/${article.slug}` || "",
      images: [{ url: imageUrl, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: imageUrl,
          alt: article.title,
          height: 630,
          width: 1200,
        },
      ],
    },
  };
}
export default async function ArticlePage(props: ArticlePageProps) {
  const { slug } = props.params;
  const articleId = getIdFromSlug(slug);

  const article = await getArticleById(articleId);

  // TODO: Handle not found with a custom not found page
  if (!article) {
    return (
      <main className="p-8">
        <div className="text-center">Article not found</div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <Article
        content={article.content}
        className="prose prose-orange mx-auto dark:prose-invert"
      />
    </main>
  );
}
