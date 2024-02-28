"use client";

import Link from "next/link";

import { MENU } from "@/config/menu";
import useSignOut from "@/hooks/use-signout";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { LucideMenu } from "lucide-react";

interface MobileMenuProps {
  isLogin: boolean;
}

export const MobileMenu = ({ isLogin }: MobileMenuProps) => {
  const signOut = useSignOut();

  return (
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
          {MENU.map((menuItem: any) => (
            <Link
              href={menuItem.link}
              key={menuItem.text}
              className="px-2 py-1"
            >
              {menuItem.text}
            </Link>
          ))}
        </div>
        {isLogin && <Button onClick={signOut}>Sign Out</Button>}
      </SheetContent>
    </Sheet>
  );
};
