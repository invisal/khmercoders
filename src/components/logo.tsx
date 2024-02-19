import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number;
  height?: number;
}

export const Logo = ({
  className,
  width = 70,
  height = 70,
  ...props
}: LogoProps) => {
  return (
    <span
      className={cn("flex items-center justify-center text-primary", className)}
      {...props}
    >
      <Link href="/">
        <Image
          src="/khmercoder.svg"
          alt="KhmercoderLogo"
          width={width}
          height={height}
        />
      </Link>
    </span>
  );
};
