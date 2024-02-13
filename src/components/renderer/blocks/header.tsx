import { OutputBlockData } from "@editorjs/editorjs";

const HEADER_LEVEL = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const HeaderBlock = (data: OutputBlockData) => {
  const Component =
    HEADER_LEVEL[data.data.level as keyof typeof HEADER_LEVEL] || "h1";

  return <Component dangerouslySetInnerHTML={{ __html: data.data.text }} />;
};
