import { PropsWithChildren } from "react";

import { getUserAuth } from "@/lib/auth/utils";

import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default async function MasterLayout({ children }: PropsWithChildren) {
  const session = await getUserAuth();

  return (
    <div>
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
}
