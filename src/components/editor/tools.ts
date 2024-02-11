// @ts-nocheck
// Plugins got no declaration files 😭
// Dunno wut to do, ignoring the ts errors for now
// Dang it!

import { Uploader } from "@/lib/uploader";

import Code from "./plugins/code";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import StrikeThrough from "@sotaproject/strikethrough";

export const tools: Record<string, ToolSettings | ToolConstructable> = {
  // typography
  header: Header,
  paragraph: {
    class: Paragraph,
    inlineToolbar: ["strikethrough", "inlineCode", "underline"],
  },

  // list
  nestedlist: NestedList,
  checklist: CheckList,

  // special
  delimiter: Delimiter,
  table: Table,
  embed: Embed,
  link: Link,
  code: Code,
  strikethrough: StrikeThrough,

  // inline
  underline: Underline,
  inlineCode: InlineCode,

  // extra configs
  image: {
    class: Image,
    config: {
      uploader: Uploader,
    },
  },
};
