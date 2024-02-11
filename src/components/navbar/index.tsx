import Link from "next/link";

import { AuthSession } from "@/lib/auth/utils";

import { Button } from "../ui/button";
import { ProfileDropdown } from "./profile-dropdown";
import { SearchInput } from "./search-input";
import { IconAsterisk, IconEdit } from "@tabler/icons-react";

interface NavBarProps {
  session: AuthSession;
}

export const Navbar = ({ session }: Readonly<NavBarProps>) => {
  const isLogin = !!session.session;

  return (
    <nav className="flex items-center justify-between gap-x-5 border-b px-5 py-2">
      <div className="flex items-center gap-3">
        <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl border">
          <IconAsterisk size={24} />
        </span>

        <SearchInput />
      </div>

      {!isLogin && (
        <Link href="/sign-in">
          <Button size={"sm"}>Sign In</Button>
        </Link>
      )}

      {isLogin && (
        <ul className="flex items-center gap-x-5">
          <li>
            <Link
              href="/write"
              className="text-muted-foreground hover:text-foreground flex items-center gap-x-2 text-sm font-medium"
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
    </nav>
  );
};
