import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthForm from "@/components/auth/form";

const Page = async () => {
  return (
    <main className="bg-popover mx-auto my-4 max-w-lg p-10">
      <h1 className="text-center text-2xl font-bold">Create an account</h1>
      <AuthForm action="/api/sign-up">
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
        Already have an account?{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default Page;
