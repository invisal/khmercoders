import { getUserAuth } from "@/lib/auth/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";

function BankResourceItem({ name }: Readonly<{ name: string }>) {
  return (
    <div className="flex gap-4 rounded-lg border p-4 shadow-sm">
      <Avatar>
        <AvatarFallback />
      </Avatar>
      <div className="leading-5">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-sm text-gray-300">Coming Soon</span>
      </div>
    </div>
  );
}

export default async function ResourcesPage() {
  const session = await getUserAuth();

  return (
    <>
      <Navbar session={session} />

      <main className="container mx-auto mt-12">
        <h1 className="text-3xl font-semibold">Resources</h1>

        <p className="my-4">
          This is a place where we offer materials to assist you in starting
          different projects and exploring topics related to Cambodia.
        </p>

        <ul className="list-disc pl-8 leading-8">
          <li>Payment Integration</li>
          <li>Khmer AI Resources</li>
          <li>SMS Integration</li>
        </ul>

        <h2 className="mt-8 border-b pb-2 text-xl font-semibold">
          Payment Integration
        </h2>

        <p className="my-4">
          This guide gives you clear, step-by-step instructions on how to
          connect with various banks in Cambodia.
        </p>

        <div className="flex flex-wrap gap-4">
          <BankResourceItem name="ABA" />
          <BankResourceItem name="Acleda" />
          <BankResourceItem name="Wing" />
          <BankResourceItem name="TrueMoney" />
          <BankResourceItem name="Philip Bank" />
        </div>

        <h2 className="mt-8 border-b pb-2 text-xl font-semibold">
          Khmer AI Resources
        </h2>

        <p className="my-4">
          <i>Coming Soon</i>
        </p>

        <h2 className="mt-8 border-b pb-2 text-xl font-semibold">
          SMS Integration
        </h2>

        <p className="my-4">
          <i>Coming Soon</i>
        </p>
      </main>

      <div></div>
    </>
  );
}
