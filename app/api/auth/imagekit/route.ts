import { getUploadAuthParams } from "@imagekit/next/server";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { privateKey, publicKey },
  },
} = config;

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: privateKey as string,
    publicKey: publicKey as string,
  });

  return NextResponse.json({
    token,
    expire,
    signature,
  });
}
