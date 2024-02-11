import ArticlePreview from "@/components/articles/ArticlePreview";
import HeroBanner from "@/components/hero-banner";
import { Navbar } from "@/components/navbar";
import { getUserAuth } from "@/lib/auth/utils";

export default async function HomePage() {
  const session = await getUserAuth();

  return (
    <div>
      <Navbar session={session} />
      <main className="container mx-auto">
        <HeroBanner />

        <div className="mt-24 mb-12">
          <h2 className="font-semibold text-xl text-yellow-400">
            Trending on KhmerCoders
          </h2>
          <div className="gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid mt-6">
            {new Array(6).fill(true).map((_, idx) => {
              return <ArticlePreview key={idx} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
