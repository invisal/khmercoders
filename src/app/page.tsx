import { Navbar } from "@/components/navbar";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getUserAuth();

  if (!session.session) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center">
        <pre>{JSON.stringify(session.session, null, 2)}</pre>
      </main>
    </div>
  );
}
