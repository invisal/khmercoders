import { code } from "@/lib/shiki";

import { OutputBlockData } from "@editorjs/editorjs";

export const CodeBlock = async (data: OutputBlockData) => {
  const rendercode = await code(
    data.data.content,
    data.data.language || "plaintext",
    "dracula",
  );
  return (
    <div>
      {data.data.language}
      <div dangerouslySetInnerHTML={{ __html: rendercode }} />
    </div>
  );
};
