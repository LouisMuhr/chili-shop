// app/api/payment/create/route.ts
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Wenn du später Mollie hast → hier rein
  // Aktuell: nur Dummy-Response für Testing
  return Response.json({
    checkoutUrl: "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS", // Test-URL
    message: "Test-Modus – Zahlung würde jetzt starten",
  });
}