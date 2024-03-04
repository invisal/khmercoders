import { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/lib/env.mjs";
import { getArticleById, incrementArticleView } from "@/lib/query/article";
import { getIdFromSlug } from "@/lib/utils";

import MasterLayout from "@/components/master-layout";
import { Article } from "@/components/renderer";

interface ArticlePageProps {
  params: { username: string; slug: string };
}

export async function generateMetadata(
  props: ArticlePageProps,
): Promise<Metadata> {
  const article = await getArticleById(getIdFromSlug(props.params.slug));

  if (!article) {
    return {};
  }

  await incrementArticleView(article.id);
  const imageUrl = article.cover || "";

  return {
    title: article.title,
    description: article.description,
    creator: article.author.username,
    authors: [
      {
        name: article.author.username,
        url: `${env.NEXT_PUBLIC_SITE_URL}/${article.author.username}` || "",
      },
    ],
    publisher: "KhmerCoders",
    openGraph: {
      type: "article",
      url:
        `${env.NEXT_PUBLIC_SITE_URL}/${article.author.username}/${article.slug}` ||
        "",
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

  if (!article) {
    return notFound();
  }

  return (
    <MasterLayout>
      <main className="p-8">
        <Article
          content={article.content}
          className="prose prose-orange mx-auto dark:prose-invert"
        />
      </main>
    </MasterLayout>
  );
}
