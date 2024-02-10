// @ts-nocheck
// Plugins got no declaration files 😭
// Dunno wut to do, ignoring the ts errors for now
// Dang it!

import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";

import { Uploader } from "@/lib/uploader";

import Header from "@editorjs/header";

// Here them plugins with no declaration files 😭
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import NestedList from "@editorjs/nested-list";
import CheckList from "@editorjs/checklist";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import Code from "./plugins/code";

export const tools: Record<string, ToolSettings | ToolConstructable> = {
  header: Header,
  paragraph: Paragraph,
  delimiter: Delimiter,
  nestedlist: NestedList,
  checklist: CheckList,
  table: Table,
  embed: Embed,
  link: Link,
  code: Code,

  image: {
    class: Image,
    config: {
      uploader: Uploader,
    },
  },
};
