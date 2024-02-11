import HeroBanner from "@/components/hero-banner";
import { Navbar } from "@/components/navbar";
import { getUserAuth } from "@/lib/auth/utils";

export default async function HomePage() {
  const session = await getUserAuth();

  return (
    <div>
      <Navbar session={session}/>
      <main className="container mx-auto">
        <HeroBanner />
      </main>
    </div>
  );
}
