// app/checkout/success/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get("pickup") === "true";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-6xl font-black text-green-500 mb-8">
          {pickup ? "Bestellung erhalten!" : "Zahlung erfolgreich!"}
        </h1>
        <p className="text-2xl mb-12">
          {pickup
            ? "Deine Bestellung ist bereit zur Abholung. Zahle vor Ort bar oder mit Karte."
            : "Vielen Dank für deinen Einkauf!"}
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