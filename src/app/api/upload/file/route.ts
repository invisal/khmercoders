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

/**
 * !IMPORTANT
 *
 * Make sure that you POST with form-data and the file key is "file"
 */
export const POST = async (request: NextRequest) => {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | undefined;

  if (!file) {
    return new Response("No file found", { status: 400 });
  }

  const size = file.size;
  const fileType = file.type;
  const fileExtenstion = file.type.split("/")[1] || "";

  // we can do compression or resizing here and return a new buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // hash the content and append the file extension
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
    filename: file.name,
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
