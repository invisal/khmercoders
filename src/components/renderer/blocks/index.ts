import { DefaultBlock } from "./default";
import { HeaderBlock } from "./header";
import { ParagraphBlock } from "./paragraph";

export const BLOCKS = {
  default: DefaultBlock,

  // typography
  header: HeaderBlock,
  paragraph: ParagraphBlock,
} as Record<string, any>;
