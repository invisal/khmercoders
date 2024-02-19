import Image from "next/image";

import { cn } from "@/lib/utils";

import { OutputBlockData } from "@editorjs/editorjs";

export const ImageBlock = (data: OutputBlockData) => {
  return (
    <div>
      <div
        className={cn(
          "relative",
          data.data.withBorder && "rounded-lg border p-4",
          data.data.withBackground && "rounded-lg bg-secondary",
          data.data.stretched && "mx-[-15vw]",
        )}
      >
        <Image
          src={data.data.file.url}
          alt={data.data.caption}
          width={0}
          height={0}
          sizes="100%"
          className="size-full"
        />
      </div>
      <p className="mb-10 text-sm font-extralight">{data.data.caption}</p>
    </div>
  );
};
