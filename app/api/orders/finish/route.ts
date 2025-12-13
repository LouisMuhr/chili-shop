// app/api/admin/orders/finish/route.ts ← neu anlegen!

import { writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "orders.json");

export async function POST(request: Request) {
  const finishedOrders = await request.json();

  await writeFile(filePath, JSON.stringify(finishedOrders, null, 2));

  return Response.json({ success: true });
}