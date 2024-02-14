import { OutputBlockData } from "@editorjs/editorjs";

export const DefaultBlock = (data: OutputBlockData) => {
  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};
