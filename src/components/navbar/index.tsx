import Link from "next/link";

import { MENU } from "@/config/menu";
import { AuthSession } from "@/lib/auth/utils";

import { Logo } from "../logo";
import { ThemeToggle } from "../theme/toggle";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";
import { ProfileDropdown } from "./profile-dropdown";
import { IconEdit } from "@tabler/icons-react";

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

      <MobileMenu isLogin={isLogin} />
    </nav>
  );
};
