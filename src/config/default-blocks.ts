import { type OutputData } from "@editorjs/editorjs";

export const DEFAULT_BLOCKS: OutputData = {
  blocks: [
    {
      type: "header",
      data: {
        level: 1,
        text: "Write a cool title here",
      },
    },
  ],
};
