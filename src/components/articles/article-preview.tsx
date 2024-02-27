import Link from "next/link";

import { CompleteArticle } from "@/lib/query/article";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface ArticlePreviewProps {
  article: CompleteArticle;
}

export default function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <Link
      href={`/@${article.author.username.toLowerCase()}/${article.slug}-${article.id}`}
    >
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="truncate">{article.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {article.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <Link href={`/@${article.author.username}`} className="flex gap-4">
            <Avatar>
              <AvatarFallback className="uppercase">
                {article.author?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="truncate text-sm font-semibold">
                {article.author.name}
              </div>
              <div className="text-xs">KhmerCoder Contributor</div>
            </div>
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
}
