// app/api/admin/orders/finish/route.ts ← Datei genau so nennen!

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ORDERS_PATH = path.join(process.cwd(), "public/data/orders.json");
const COMPLETED_ORDERS_PATH = path.join(process.cwd(), "public/data/completed-orders.json");

// Hilfsfunktionen
const loadOrders = async (filePath: string): Promise<any[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Wenn Datei nicht existiert, leeres Array zurückgeben
    return [];
  }
};

const saveOrders = async (filePath: string, orders: any[]) => {
  await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
};

// POST-Handler
export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (typeof orderId !== "number") {
      return NextResponse.json({ message: "Fehlende oder ungültige orderId." }, { status: 400 });
    }

    // Daten laden
    const orders = await loadOrders(ORDERS_PATH);
    const completedOrders = await loadOrders(COMPLETED_ORDERS_PATH);

    // Bestellung finden
    const itemIndex = orders.findIndex((order: any) => order.id === orderId);

    if (itemIndex === -1) {
      return NextResponse.json({ message: `Bestellung mit ID ${orderId} nicht gefunden.` }, { status: 404 });
    }

    // Bestellung entfernen und zwischenspeichern
    const [finishedItem] = orders.splice(itemIndex, 1);

    // In completed packen
    completedOrders.push(finishedItem);

    // Speichern
    await saveOrders(ORDERS_PATH, orders);
    await saveOrders(COMPLETED_ORDERS_PATH, completedOrders);

    return NextResponse.json({
      message: `Bestellung ${orderId} erfolgreich abgeschlossen.`,
      finishedOrder: finishedItem,
    });
  } catch (error) {
    console.error("Fehler in markAsFinished:", error);
    return NextResponse.json({ message: "Interner Serverfehler beim Verschieben der Bestellung." }, { status: 500 });
  }
}