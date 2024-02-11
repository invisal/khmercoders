import { IconAsterisk, IconEdit } from "@tabler/icons-react";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { ProfileDropdown } from "./profile-dropdown";
import { AuthSession } from "@/lib/auth/utils";
import { Button } from "../ui/button";

interface NavBarProps {
  session: AuthSession;
}

export const Navbar = ({ session }: Readonly<NavBarProps>) => {
  const isLogin = !!session.session;

  return (
    <nav className="px-5 py-2 border-b flex gap-x-5 items-center justify-between">
      <div className="flex gap-3 items-center">
        <span className="bg-secondary border size-10 flex items-center justify-center rounded-xl">
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
        <ul className="flex gap-x-5 items-center">
          <li>
            <Link
              href="/write"
              className="flex text-sm font-medium text-muted-foreground hover:text-foreground gap-x-2 items-center"
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
