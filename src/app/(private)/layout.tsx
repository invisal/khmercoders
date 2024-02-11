import { PropsWithChildren } from "react";

import { checkAuth } from "@/lib/auth/utils";

import { ThemeToggle } from "@/components/theme/toggle";

export default async function AppLayout({ children }: PropsWithChildren) {
  // VALIDATE USER
  await checkAuth();

  return (
    <main className="flex-1 overflow-y-auto p-8 pt-2 md:p-8">
      <ThemeToggle />
      {children}
    </main>
  );
}
