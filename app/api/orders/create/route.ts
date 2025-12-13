// app/api/orders/create/route.ts ← neu anlegen!

import { writeFile, readFile } from "fs/promises";
import path from "path";

const ordersPath = path.join(process.cwd(), "public", "data", "orders.json");

export async function POST(request: Request) {
  const newOrder = await request.json();

  // Alte Bestellungen laden
  const data = await readFile(ordersPath, "utf-8").catch(() => "[]");
  const orders = JSON.parse(data);

  // Bestellnummer generieren (einfach: höchste ID + 1)
  const nextId = orders.length > 0 ? Math.max(...orders.map((o: any) => o.id)) + 1 : 1;
  const orderNumber = `2025-${String(nextId).padStart(4, "0")}`;

  const orderWithMeta = {
    id: nextId,
    orderNumber,
    date: new Date().toISOString(),
    status: newOrder.pickup ? "Wartet auf Abholung" : "Zahlung ausstehend",
    pickup: newOrder.pickup || false,
    ...newOrder,
  };

  orders.push(orderWithMeta);

  // Speichern
  await writeFile(ordersPath, JSON.stringify(orders, null, 2));

  return Response.json({ success: true, orderNumber });
}