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
    <Link href={`/@${article.author.username}/${article.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback className="uppercase">
                {article.author?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{article.author.name}</div>
              <div className="text-xs">20 articles</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
