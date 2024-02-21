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
    <div className="flex flex-col items-center p-4 shadow rounded-lg bg-card text-card-foreground">
      <Avatar className="size-24">
        <AvatarFallback className="uppercase text-4xl">
          {user.name ? user.name.slice(0, 2) : "CN"}
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-4 font-bold text-xl text-primary">{user.name}</h2>
      <span className="text-muted-foreground">{10} Followers</span>
      <p className="text-center mt-2 text-secondary-foreground">{user.about}</p>
      <Button>Follow</Button>
    </div>
  );
};
