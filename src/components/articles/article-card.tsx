/* eslint-disable @next/next/no-img-element */
interface ArticleCardProps {
  article: {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    description: string | null;
    title: string;
    content: string;
    cover: string | null;
  };
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = article.createdAt
    ? article.createdAt.slice(0, 10)
    : "Unknown Date";
  return (
    <div className="rounded-xl shadow-md overflow-hidden my-4 w-full">
      <div className="md:flex">
        <div className="flex-1 p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {formattedDate}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-white hover:underline"
          >
            {article.title}
          </a>
          <p className="mt-2 text-gray-500">{article.description}</p>
        </div>
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={article.cover || "https://via.placeholder.com/150"}
            alt={article.title}
          />
        </div>
      </div>
    </div>
  );
};
