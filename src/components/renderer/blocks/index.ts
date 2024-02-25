import { CodeBlock } from "./code";
import { DefaultBlock } from "./default";
import { HeaderBlock } from "./header";
import { ImageBlock } from "./image";
import { LinkPreview } from "./link-preview";
import { ParagraphBlock } from "./paragraph";

export const BLOCKS = {
  default: DefaultBlock,

  code: CodeBlock,
  image: ImageBlock,
  header: HeaderBlock,
  paragraph: ParagraphBlock,
  fancyLink: LinkPreview,
} as Record<string, any>;
