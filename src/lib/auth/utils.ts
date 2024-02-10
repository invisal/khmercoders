import { redirect } from "next/navigation";
import { getPageSession } from "@/lib/auth/lucia";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      username?: string;
    };
  } | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
  const session = await getPageSession();
  if (!session) return { session: null };
  return {
    session: {
      user: {
        id: session.user?.userId,
        name: session.user?.name,
        email: session.user?.email,
        username: session.user?.username,
      },
    },
  };
};

export const checkAuth = async () => {
  const session = await getPageSession();
  if (!session) redirect("/sign-in");
};
