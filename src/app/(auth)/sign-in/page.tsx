import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthForm from "@/components/auth/form";

const Page = async () => {
  return (
    <main className="bg-popover mx-auto my-4 max-w-lg p-10">
      <h1 className="text-center text-2xl font-bold">
        Sign in to your account
      </h1>
      <AuthForm action="/api/sign-in">
        <Label htmlFor="username" className="text-muted-foreground">
          Username
        </Label>
        <Input name="username" id="username" />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input type="password" name="password" id="password" />
        <br />
      </AuthForm>
      <div className="text-muted-foreground mt-4 text-center text-sm">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/sign-up"
          className="text-accent-foreground hover:text-primary underline"
        >
          Create an account
        </Link>
      </div>
    </main>
  );
};

export default Page;
