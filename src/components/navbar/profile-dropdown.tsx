"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";

export const ProfileDropdown = () => {
  const router = useRouter();
  const handleSignout = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      return router.refresh();
    }

    toast.error("Failed to signout");
  };

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
          className="text-muted-foreground min-w-44"
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
            onClick={handleSignout}
            className="hover:!text-destructive focus:!text-destructive flex cursor-pointer gap-x-2"
          >
            <IconLogout size={16} />
            <span>Signout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
