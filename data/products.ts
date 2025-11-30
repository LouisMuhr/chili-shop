// data/products.ts
import { readFile } from "fs/promises";
import path from "path";

export type Product = {
  id: string;
  name: string;
  price: number;
  hotness: number;
  spiciness: number;
  image?: string;
};

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public", "data", "products.json");
  const json = await readFile(filePath, "utf-8").catch(() => "[]");
  return JSON.parse(json);
}