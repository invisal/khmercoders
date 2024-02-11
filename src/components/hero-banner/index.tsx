import { Button } from "../ui/button";
import HeroBannerMedia from "./HeroBannerMedia";

export default function HeroBanner() {
  return (
    <div className="flex gap-12">
      <div className="flex-grow justify-center flex flex-col gap-8">
        <h1 className="text-5xl font-semibold">Khmer Coders</h1>
        <p className='text-lg'>
          With over 7,000 members, KhmerCoders is one of the largest Cambodian
          developer community. It is best place to meet like-minded people,
          networking, share knowledge and find collaboration.
        </p>


        <div className="gap-4 flex">
        <Button>
          Join Facebook
        </Button>

        <Button>
          Join Discord
        </Button>
        </div>
      </div>
      <HeroBannerMedia />
    </div>
  );
}
