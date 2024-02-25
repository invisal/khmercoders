import { getLatestArticles } from "@/lib/query/article";

import ArticlePreview from "@/components/articles/article-preview";
import HeroBanner from "@/components/hero-banner";
import MasterLayout from "@/components/master-layout";

// revalidate on every request
export const revalidate = 0;

export default async function HomePage() {
  const articles = await getLatestArticles({ limit: 6, offset: 0 });

  return (
    <MasterLayout>
      <main className="container mx-auto">
        <HeroBanner />

        <div className="mb-12 mt-24">
          <h2 className="text-xl font-semibold text-yellow-400">
            Trending on KhmerCoders
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              return <ArticlePreview key={article.id} article={article} />;
            })}
          </div>
        </div>
      </main>
    </MasterLayout>
  );
}
