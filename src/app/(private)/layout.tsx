import { PropsWithChildren } from "react";

import { checkAuth } from "@/lib/auth/utils";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  // VALIDATE USER
  await checkAuth();

  return <div>{children}</div>;
}
