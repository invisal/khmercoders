import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import khmercoder from "public/khmercoder.svg";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconSize?: number;
}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <span
      className={cn("text-primary flex items-center justify-center", className)}
      {...props}
    >
      <Link href="/">
        <Image src={khmercoder} alt="KhmercoderLogo" width={70} height={70} />
      </Link>
    </span>
  );
};
