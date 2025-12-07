// app/api/admin/products/route.ts  ← komplett ersetzen!

import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "products.json");

export async function GET() {
  const data = await readFile(filePath, "utf-8").catch(() => "[]");
  return Response.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const products = await request.json();
  await writeFile(filePath, JSON.stringify(products, null, 2));
  return Response.json({ ok: true });
}