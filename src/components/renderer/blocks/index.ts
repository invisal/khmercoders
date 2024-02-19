import { CodeBlock } from "./code";
import { DefaultBlock } from "./default";
import { HeaderBlock } from "./header";
import { ImageBlock } from "./image";
import { ParagraphBlock } from "./paragraph";

export const BLOCKS = {
  default: DefaultBlock,

  code: CodeBlock,
  image: ImageBlock,
  header: HeaderBlock,
  paragraph: ParagraphBlock,
} as Record<string, any>;
