import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ArticlePreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Introductory Statistics (Personal Note 1)— Data</CardTitle>
        <CardDescription>
          The theory of probabilities is at bottom nothing but common sense
          reduced to calculus — Laplace
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">Rina Bouy</div>
            <div className="text-xs">20 articles</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
