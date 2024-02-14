"use client";

import React, { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Editor, {
  TextareaCodeEditorProps,
} from "@uiw/react-textarea-code-editor";
import { Check, ChevronsUpDown } from "lucide-react";

export interface CodeEditorProps extends TextareaCodeEditorProps {
  value: string;
  language: string;
}

const DEFAULT = {
  language: "typescript",
  value: "",
};

export const CodeEditor = ({
  className,
  language: defaultLang,
  value,
  disabled,
  ...props
}: CodeEditorProps) => {
  const [language, setLanguage] = useState(defaultLang || DEFAULT.language);

  return (
    <div className="not-prose relative">
      <div className="absolute right-3 top-3 z-10">
        <LanguageSelect
          disabled={disabled}
          value={language}
          onChange={setLanguage}
        />
      </div>
      <Editor
        padding={18}
        minHeight={300}
        data-color-mode="light"
        language={language}
        defaultValue={value || DEFAULT.value}
        className={cn(
          "!bg-accent size-full flex-1 rounded-xl border !font-mono *:!text-base",
          className,
        )}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

const LANGUAGES = [
  { label: "Typescript", value: "typescript" },
  { label: "Javascript", value: "javascript" },
  { label: "Python", value: "pythong" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "YAML", value: "yaml" },
  { label: "Markdown", value: "markdown" },
];

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const LanguageSelect = ({ disabled, value, onChange }: LanguageSelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Fragment>
      <input
        type="hidden"
        aria-hidden
        data-language-select
        className="langauge-select"
        value={value}
        disabled={disabled}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className="w-fit justify-between text-sm"
          >
            {value
              ? LANGUAGES.find((language) => language.value === value)?.label
              : "select language"}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {LANGUAGES.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === language.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};
