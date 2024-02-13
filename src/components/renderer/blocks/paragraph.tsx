import { OutputBlockData } from "@editorjs/editorjs";

export const ParagraphBlock = (data: OutputBlockData) => {
  return <p dangerouslySetInnerHTML={{ __html: data.data.text }}></p>;
};
