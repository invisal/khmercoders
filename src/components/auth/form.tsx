"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Action = "/api/sign-in" | "/api/sign-up" | "/api/sign-out";

const AuthForm = ({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: Action;
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ error: string } | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <form
      action={action}
      method="post"
      className="mt-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh();
        }
        setErrors(await response.json());
        setLoading(false);
      }}
    >
      {errors ? (
        <div className="bg-red-100 p-3 my-4">
          <h3 className="font-bold text-md">Error!</h3>
          <p className="text-sm">{errors.error}</p>
        </div>
      ) : null}
      {children}
      <SubmitButton action={action} loading={loading} />
    </form>
  );
};

export default AuthForm;

const SubmitButton = ({
  action,
  loading,
}: {
  action: Action;
  loading: boolean;
}) => {
  let buttonSuffix = "";
  switch (action) {
    case "/api/sign-in":
      buttonSuffix = "in";
      break;
    case "/api/sign-out":
      buttonSuffix = "out";
      break;
    case "/api/sign-up":
      buttonSuffix = "up";
      break;
  }
  return (
    <Button
      type="submit"
      className={action === "/api/sign-out" ? "" : "w-full"}
      disabled={loading}
      variant={action === "/api/sign-out" ? "destructive" : "default"}
    >
      Sign{loading ? "ing" : ""} {buttonSuffix}
    </Button>
  );
};
