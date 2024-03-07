import { useRouter } from "next/navigation";

import { toast } from "sonner";

const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      return router.refresh();
    }
    toast.error("Failed to signout");
  };

  return signOut;
};

export default useSignOut;
