import { cn } from "@/lib/utils";

import { IconAsterisk } from "@tabler/icons-react";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconSize?: number;
}

export const Logo = ({ iconSize, className, ...props }: LogoProps) => {
  return (
    <span
      className={cn(
        "bg-secondary text-primary flex size-10 items-center justify-center rounded-xl border",
        className,
      )}
      {...props}
    >
      <IconAsterisk size={iconSize || 24} />
    </span>
  );
};
