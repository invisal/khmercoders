"use client";

import React, { useState } from "react";

import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof navigator !== "undefined") {
      try {
        await navigator.clipboard.writeText(value);
        setHasCopied(true);

        setTimeout(() => {
          setHasCopied(false);
        }, 4000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={className}
      onClick={copyToClipboard}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CopyCheck size={24} /> : <Copy size={24} />}
    </Button>
  );
}
