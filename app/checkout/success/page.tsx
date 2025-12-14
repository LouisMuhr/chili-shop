"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [pickup, setPickup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderNumber(params.get("order"));
    setPickup(params.get("pickup") === "true");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-5xl md:text-6xl font-black text-green-500 mb-8">
          {pickup ? "Bestellung erhalten!" : "Zahlung erfolgreich!"}
        </h1>

        {orderNumber && (
          <p className="text-2xl mb-4">
            Deine Bestellnummer:{" "}
            <span className="text-[#e63946] font-black">{orderNumber}</span>
          </p>
        )}

        <p className="text-xl mb-12 max-w-2xl mx-auto">
          {pickup
            ? "Deine Bestellung ist bereit zur Abholung. Zahle vor Ort bar oder mit Karte."
            : "Vielen Dank für deinen Einkauf! Deine Bestellung ist bei uns eingegangen."}
        </p>

        <Link
          href="/"
          className="inline-block px-12 py-6 bg-[#e63946] hover:bg-[#c1121f] text-white font-black text-xl rounded-2xl shadow-2xl transition"
        >
          Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}
