import Link from "next/link";

import { MENU } from "@/config/menu";
import { AuthSession } from "@/lib/auth/utils";

import { Logo } from "../logo";
import { ThemeToggle } from "../theme/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ProfileDropdown } from "./profile-dropdown";
import { IconEdit } from "@tabler/icons-react";
import { LucideMenu } from "lucide-react";

interface NavBarProps {
  session: AuthSession;
}

export const Navbar = ({ session }: Readonly<NavBarProps>) => {
  const isLogin = !!session.session;

  return (
    <nav className="flex items-center justify-between gap-x-5 border-b px-5">
      <div className="flex items-center">
        <Logo width={70} height={70} />
      </div>

      <div className="hidden gap-4 lg:flex">
        {MENU.map((menuItem) => (
          <Link href={menuItem.link} key={menuItem.text}>
            {menuItem.text}
          </Link>
        ))}
      </div>

      <div className="grow" />

      <div>
        <ThemeToggle />
      </div>

      {!isLogin && (
        <Link href="/sign-in">
          <Button size={"sm"}>Sign In</Button>
        </Link>
      )}

      {isLogin && (
        <ul className="hidden items-center gap-x-5 lg:flex">
          <li>
            <Link
              href="/write"
              className="flex items-center gap-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <IconEdit size={18} />
              <span>Write</span>
            </Link>
          </li>

          <li>
            <ProfileDropdown />
          </li>
        </ul>
      )}

      <Sheet>
        <SheetTrigger>
          <LucideMenu className="lg:hidden" />
        </SheetTrigger>
        <SheetContent>
          <Avatar className="mb-8 size-9 border hover:brightness-95">
            <AvatarFallback>JD</AvatarFallback>
            <AvatarImage
              alt="profile"
              sizes="40px"
              src="https://avatars.githubusercontent.com/u/20983608?v=4"
            />
          </Avatar>

          <div className="flex flex-col gap-2">
            {MENU.map((menuItem) => (
              <Link
                href={menuItem.link}
                key={menuItem.text}
                className="px-2 py-1"
              >
                {menuItem.text}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
