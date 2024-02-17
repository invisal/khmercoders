import { code } from "@/lib/shiki";

import { OutputBlockData } from "@editorjs/editorjs";

export const CodeBlock = async (data: OutputBlockData) => {
  const rendercode = await code(
    data.data.content,
    data.data.language,
    "dracula",
  );

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: rendercode }} />
    </div>
  );
};
