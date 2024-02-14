import React from "react";

import { cn } from "@/lib/utils";

import { Label as BaseLabel } from "./label";
import { TextareaProps } from "./textarea";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Root = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("relative", className)} {...props} />;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-accent ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-hit flex w-full rounded-md px-3 pb-2 pt-8 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-secondary ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md px-3 pb-2 pt-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

const Label = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) => {
  return (
    <BaseLabel
      className={cn(
        "text-muted-foreground absolute left-3 top-2 text-sm font-normal",
        className,
      )}
      {...props}
    />
  );
};

export const FatInput = {
  Root,
  Input,
  Label,
  Textarea,
};
