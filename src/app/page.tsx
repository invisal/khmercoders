import { getUserAuth } from "@/lib/auth/utils";

import ArticlePreview from "@/components/articles/article-preview";
import HeroBanner from "@/components/hero-banner";
import { Navbar } from "@/components/navbar";
import ProfilePreview from "@/components/profile-preview";

export default async function HomePage() {
  const session = await getUserAuth();

  return (
    <div>
      <Navbar session={session} />
      <main className="container mx-auto">
        <HeroBanner />

        <div className="mb-12 mt-24">
          <h2 className="text-xl font-semibold text-yellow-400">
            Trending on KhmerCoders
          </h2>

          <div className="my-12 flex flex-wrap gap-8">
            {new Array(4).fill(true).map((_, idx) => {
              return <ProfilePreview key={idx} />;
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {new Array(6).fill(true).map((_, idx) => {
              return <ArticlePreview key={idx} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
