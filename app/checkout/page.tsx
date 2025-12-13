// app/checkout/page.tsx ← KOMPLETT ERSETZEN!

"use client";

import { useCart } from "@/lib/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [pickup, setPickup] = useState(false);
  const total = getTotalPrice();

  const handleCheckout = async () => {
    if (pickup) {
      alert("Bestellung für Abholung gespeichert! Zahle vor Ort.");
      window.location.href = "/checkout/success?pickup=true";
      return;
    }

    alert("Online-Zahlung kommt bald – Test: Weiterleitung zu Success");
    window.location.href = "/checkout/success";
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-6"> {/* ← mehr Platz oben! */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center text-[#e63946] mb-10">
          Checkout
        </h1>

        <div className="bg-[#0f0f0f] rounded-2xl p-6 md:p-10 shadow-2xl border border-gray-800">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-5">Lieferoption</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input
                  type="radio"
                  name="delivery"
                  checked={!pickup}
                  onChange={() => setPickup(false)}
                  className="w-5 h-5 text-[#e63946]"
                />
                <div>
                  <p className="text-lg font-bold">Versand nach Hause</p>
                  <p className="text-gray-400 text-sm">+ Versandkosten (später)</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input
                  type="radio"
                  name="delivery"
                  checked={pickup}
                  onChange={() => setPickup(true)}
                  className="w-5 h-5 text-[#e63946]"
                />
                <div>
                  <p className="text-lg font-bold">Abholung vor Ort</p>
                  <p className="text-gray-400 text-sm">Zahle bar oder mit Karte bei Abholung</p>
                </div>
              </label>
            </div>
          </div>

          <div className="text-right mb-8">
            <p className="text-3xl md:text-4xl font-black text-[#e63946]">
              Gesamt: {total.toFixed(2)} €
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] text-white font-black text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {pickup ? "Bestellung für Abholung bestätigen" : "Zur Zahlung →"}
          </button>

          {pickup && (
            <p className="text-center text-gray-400 mt-6 text-sm">
              Adresse: [Deine Adresse hier] · Öffnungszeiten: Mo–Sa 10–18 Uhr
            </p>
          )}
        </div>
      </div>
    </div>
  );
}