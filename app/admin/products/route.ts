// app/admin/products/route.ts ← nur POST ändern!

import { writeFile, readFile } from "fs/promises";
import { unlink } from "fs/promises"; // ← NEU: für Bild löschen
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "products.json");

export async function GET() {
  const data = await readFile(filePath, "utf-8").catch(() => "[]");
  return Response.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const updatedProducts = await request.json();

  // Alte Produkte laden, um gelöschte zu finden
  const oldData = await readFile(filePath, "utf-8").catch(() => "[]");
  const oldProducts = JSON.parse(oldData);

  // Gelöschte Produkte finden
  const deletedProducts = oldProducts.filter(
    (old: any) => !updatedProducts.some((p: any) => p.id === old.id)
  );

  // Bilder der gelöschten Produkte entfernen
  for (const product of deletedProducts) {
    if (product.image) {
      const imagePath = path.join(process.cwd(), "public", product.image);
      await unlink(imagePath).catch((err) => {
        console.log(`Bild nicht gefunden oder schon gelöscht: ${product.image}`);
      });
    }
  }

  // Neue Liste speichern
  await writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

  return Response.json({ ok: true });
}