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

export const tools: Record<string, ToolSettings | ToolConstructable> = {
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  paragraph: Paragraph,
  delimiter: Delimiter,
  nestedlist: NestedList,
  checklist: CheckList,
  table: Table,
  embed: Embed,
  link: Link,
  code: Code,
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+M",
  },

  image: {
    class: Image,
    config: {
      uploader: Uploader,
    },
  },
};
