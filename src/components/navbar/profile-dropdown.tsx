"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
          <Avatar className="border h-9 w-9 hover:brightness-95">
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
            <Link href="/profile" className="flex gap-x-2 cursor-pointer">
              <IconUser size={16} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex gap-x-2 cursor-pointer">
              <IconSettings size={16} />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignout}
            className="flex gap-x-2 cursor-pointer hover:!text-destructive focus:!text-destructive"
          >
            <IconLogout size={16} />
            <span>Signout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
