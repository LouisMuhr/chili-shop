// app/api/admin/upload/route.ts
import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const index = data.get("index") as string;

  if (!file) return new Response(JSON.stringify({ error: "No file" }), { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public", "images", filename);

  await writeFile(filepath, buffer);

  return new Response(JSON.stringify({ url: `/images/${filename}` }));
}