import { notFound } from "next/navigation";

import { getPageSession } from "@/lib/auth/lucia";

import WritePageBody from "./page-write";

export default async function WritePage() {
  const user = await getPageSession();

  if (!user?.user.isWritable) {
    return notFound();
  }

  return <WritePageBody />;
}
