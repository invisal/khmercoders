import { checkAuth } from "@/lib/auth/utils";
import { PropsWithChildren } from "react";

export default async function AppLayout({ children }: PropsWithChildren) {
  // VALIDATE USER
  await checkAuth();

  return (
    <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">{children}</main>
  );
}
