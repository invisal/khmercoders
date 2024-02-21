"use client";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

/* eslint-disable @next/next/no-img-element */
interface UserProfileProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    username: string;
    avatar: string | null;
    about: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-card p-4 text-card-foreground shadow">
      <Avatar className="size-24">
        <AvatarFallback className="text-4xl uppercase">
          {user.name ? user.name.slice(0, 2) : "CN"}
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-4 text-xl font-bold text-primary">{user.name}</h2>
      <span className="text-muted-foreground">{10} Followers</span>
      <p className="mt-2 text-center text-secondary-foreground">{user.about}</p>
      <Button>Follow</Button>
    </div>
  );
};
