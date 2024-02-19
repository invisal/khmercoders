import { getArticleById } from "@/lib/query/article";
import { getIdFromSlug } from "@/lib/utils";

import { Article } from "@/components/renderer";

interface ArticlePageProps {
  params: { username: string; slug: string };
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
