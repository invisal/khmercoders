import { code } from "@/lib/shiki";

import { CopyButton } from "@/components/clipboard";

import { OutputBlockData } from "@editorjs/editorjs";

export const CodeBlock = async (data: OutputBlockData) => {
  const rendercode = await code(data.data.content, data.data.language);

  return (
    <div>
      <div className="relative">
        <CopyButton
          value={data.data.content}
          className="absolute right-2 top-2"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: rendercode }} />
    </div>
  );
};
