"use client";

import Link from "next/link";

import useSignOut from "@/hooks/use-signout";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export const ProfileDropdown = () => {
  const signOut = useSignOut();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-9 border hover:brightness-95">
            <AvatarFallback>JD</AvatarFallback>
            <AvatarImage
              alt="profile"
              sizes="40px"
              src="https://avatars.githubusercontent.com/u/20983608?v=4"
            />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-44 text-muted-foreground"
        >
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex cursor-pointer gap-x-2">
              <IconUser size={16} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex cursor-pointer gap-x-2">
              <IconSettings size={16} />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOut}
            className="flex cursor-pointer gap-x-2 hover:!text-destructive focus:!text-destructive"
          >
            <IconLogout size={16} />
            <span>Signout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
