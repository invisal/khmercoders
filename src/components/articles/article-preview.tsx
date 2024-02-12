import ProfilePreview from "../profile-preview";
import {
  Card,
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
        <ProfilePreview />
      </CardFooter>
    </Card>
  );
}
