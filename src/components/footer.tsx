import Link from "next/link";

import { MENU } from "@/config/menu";

import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div>
      <Separator />

      <div className="container mx-auto mt-2 py-2">
        <ul className="flex gap-4">
          {MENU.map((menuItem) => (
            <li key={menuItem.text} className="font-semibold">
              <Link href={menuItem.link}>{menuItem.text}</Link>
            </li>
          ))}
        </ul>

        <div className="my-4 text-sm">
          © Copyright 2024 KhmerCoders All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
