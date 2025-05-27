import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

export async function POST(req: Request) {
  const { fileKey } = await req.json();

  if (!fileKey) {
    return NextResponse.json({ error: "Missing fileKey" }, { status: 400 });
  }

  const result = await utapi.deleteFiles(fileKey);

  return NextResponse.json({ success: true, result });
}
