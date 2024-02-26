/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OutputBlockData } from "@editorjs/editorjs";

export const LinkPreview = (data: OutputBlockData) => {
  const url = new URL(data.data.link);
  const domain = url.hostname;
  if (!data.data.meta) {
    return <Link href={data.data.link}>{data.data.link}</Link>;
  }

  console.log(data.data.meta.image.url);

  return (
    <Link href={data.data.link} className="no-underline">
      <Card className="flex flex-col items-start justify-between rounded-lg shadow-md md:flex-row">
        <div className="flex-1 pr-4">
          <CardHeader className="mt-[-2rem]">
            <CardTitle className="text-lg font-bold text-black">
              {data.data.meta.title}
            </CardTitle>

            <CardDescription className="line-clamp-2 text-gray-700">
              {data.data.meta.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-4 text-xs text-slate-500">
              {domain}
            </CardDescription>
          </CardContent>
        </div>
        <div className="h-24 w-full md:w-36 lg:pr-6">
          <img
            src={data.data.meta.image.url}
            alt={data.data.title}
            className="size-full rounded-lg object-cover"
          />
        </div>
      </Card>
    </Link>
  );
};
