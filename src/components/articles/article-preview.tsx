import ProfilePreview from "../profile-preview";
import Link from "next/link";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface ArticlePreviewProps {
  id: string;
  title: string;
  description: string | null;
  cover: string | null;
  author: {
    name: string;
    avatar: string | null;
  };
}

export default function ArticlePreview(props: ArticlePreviewProps) {
  return (
    <Link href={`/@${props.author.name}/${props.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback className="uppercase">
                {props.author.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{props.author.name}</div>
              <div className="text-xs">20 articles</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
