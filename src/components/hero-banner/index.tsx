import Link from "next/link";

import { Button } from "../ui/button";
import HeroBannerMedia from "./hero-banner-media";

export default function HeroBanner() {
  return (
    <div className="mt-10 flex flex-col gap-12 lg:flex-row">
      <div className="flex grow flex-col justify-center gap-8 lg:pr-16">
        <h1 className="text-5xl font-semibold text-yellow-400">Khmer Coders</h1>
        <p className="text-lg">
          With over 7,000 members, KhmerCoders is one of the largest Cambodian
          developer community. It is best place to meet like-minded people,
          networking, share knowledge and find collaboration.
        </p>

        <div className="flex gap-4">
          <Link href="https://www.facebook.com/groups/1104437376352783">
            <Button>Join Facebook</Button>
          </Link>

          <Link href="https://discord.gg/3MrD2KFWCN">
            <Button>Join Discord</Button>
          </Link>
        </div>
      </div>
      <HeroBannerMedia />
    </div>
  );
}
