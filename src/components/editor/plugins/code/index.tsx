import { CodeEditor } from "./code-editor";
import { BlockTool } from "@editorjs/editorjs";
import { createRoot } from "react-dom/client";

interface CodeData {
  content: string;
  language: string;
}

export default class Code implements BlockTool {
  private readonly readOnly: boolean;
  private _data: CodeData;

  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get enableLineBreaks(): boolean {
    return true;
  }

  constructor(config: any) {
    const { data, readOnly } = config;
    this.readOnly = readOnly ? true : false;

    this._data = {
      content: data?.content || "",
      language: data?.language || "typescript",
    };
  }

  render() {
    const holder = document.createElement("div");
    const root = createRoot(holder);

    root.render(
      <CodeEditor
        language={this._data.language}
        value={this._data.content}
        disabled={this.readOnly}
      />,
    );

    return holder;
  }

  save(holder: HTMLDivElement) {
    const editor = holder.querySelector("textarea");
    const language = holder.querySelector("input");

    if (!editor || !language) {
      console.error(
        "[EditorJS] - [Code] - [save] - No editor or language input found",
      );
    }

    const content = editor?.value;
    const lang = language?.value;

    return {
      content: content ?? "",
      language: lang ?? "",
    };
  }

  static get toolbox() {
    return {
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"/></svg>`,
      title: "Code Block",
    };
  }

  static get pasteConfig() {
    return {
      tags: ["pre"],
    };
  }

  static get sanitize() {
    return {
      content: true,
      language: false,
    };
  }
}
