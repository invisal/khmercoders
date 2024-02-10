"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@/components/editor").then((mod) => mod.Editor),
  {
    ssr: false,
  },
);

export default function WritePage() {
  return <Editor />;
}
