import { env } from "./env.mjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const R2Client = new S3Client({
  region: "auto",
  endpoint: env.R2_URL,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

async function upload(buffer: Buffer, key: string, contentType: string) {
  await R2Client.send(
    new PutObjectCommand({
      Key: key,
      ContentType: contentType,
      Body: buffer,
      Bucket: env.R2_BUCKET,
    }),
  );

  const url = new URL(key, env.R2_PUBLIC_URL);
  return url.toString();
}

export const R2 = {
  ...R2Client,
  upload,
};
