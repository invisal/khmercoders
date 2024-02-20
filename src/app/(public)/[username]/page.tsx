"use client";

import { useEffect, useState } from "react";

import { getArticlesByUsername } from "@/lib/query/article";
import { getUserByUsername } from "@/lib/query/user";

import { ArticleCard } from "@/components/articles/article-card";
import { UserProfile } from "@/components/user-info/user-profile";

interface UserProfilePageProps {
  params: { username: string };
}

const UserProfilePage: React.FC<UserProfilePageProps> = (props) => {
  const { username } = props.params;

  const decodedUserName = decodeURIComponent(username);
  const usernameWithoutAt = decodedUserName.slice(1);

  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadUser = async () => {
    const user = await getUserByUsername(usernameWithoutAt);
    setUser(user);
  };
  const loadArticles = async () => {
    const newArticles = await getArticlesByUsername(
      usernameWithoutAt,
      10,
      offset,
    );

    if (!newArticles) {
      return setHasMore(false);
    }
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setOffset((prevOffset) => prevOffset + newArticles.length);
    setHasMore(newArticles.length === 10);
  };

  useEffect(() => {
    loadUser();
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <main className="p-8">
        <div className="text-center">User not found...</div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <UserProfile user={user} />
        <div className="article-container">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {hasMore && (
          <button onClick={loadArticles} className="load-more-btn">
            Load More
          </button>
        )}
      </div>
    </main>
  );
};

export default UserProfilePage;
