import { NextRequest, NextResponse } from "next/server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  insertUserUploadSchema,
  NewUserUpload,
  userUploads,
} from "@/lib/db/schema/user-uploads";
import { md5 } from "@/lib/md5";
import { R2 } from "@/lib/r2";
import { concat } from "@/lib/utils";

import { err, isErr, ok } from "@justmiracle/result";

export const POST = async (request: NextRequest) => {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const imageUrl = body.url;

  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json("Invalid url", { status: 400 });
  }

  const fileResponse = await fetch(imageUrl);
  const blob = await fileResponse.blob();

  const filename = imageUrl.split("/").pop() || "";
  const fileType = blob.type;
  const fileExtenstion = fileType.split("/").pop() || "";
  const size = blob.size;

  // we can do compression or resizing here and return a new buffer
  const buffer = Buffer.from(await blob.arrayBuffer());

  const hashedContent = concat(md5(buffer), ".", fileExtenstion);

  const url = await R2.upload(buffer, hashedContent, fileType)
    .then(ok)
    .catch(err);

  if (isErr(url)) {
    return NextResponse.json(url.error, { status: 400 });
  }

  const userUploadParams = insertUserUploadSchema.safeParse({
    userId: session.user.id,
    hash: hashedContent,
    filename: filename,
    size,
  } satisfies NewUserUpload);

  if (!userUploadParams.success)
    return NextResponse.json(userUploadParams.error.message, { status: 400 });

  const newUserUpload = await db
    .insert(userUploads)
    .values(userUploadParams.data)
    .onConflictDoNothing()
    .then(ok)
    .catch(err);

  if (isErr(newUserUpload)) {
    return NextResponse.json(newUserUpload.error.message, { status: 400 });
  }

  return NextResponse.json({ url: url.value });
};
