import { getArticlesByUsername } from "@/lib/query/article";
import { getUserByUsername } from "@/lib/query/user";

import { ArticleCard } from "@/components/articles/article-card";
import LoadMoreArticles from "@/components/articles/load-more-button";
import { UserProfile } from "@/components/user-info/user-profile";

interface UserProfilePageProps {
  params: { username: string };
}

export default async function UserProfilePage(prop: UserProfilePageProps) {
  let { username } = prop.params;

  const decodedUserName = decodeURIComponent(username);
  const usernameWithoutAt = decodedUserName.slice(1);

  const user = await getUserByUsername(usernameWithoutAt);

  if (!user) {
    return (
      <main className="p-8">
        <div className="text-center">User not found...</div>
      </main>
    );
  }

  let articles = await getArticlesByUsername(usernameWithoutAt);

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <UserProfile user={user} />
        <div className="article-container">
          {articles!.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          <LoadMoreArticles username={usernameWithoutAt} />
        </div>
      </div>
    </main>
  );
}
