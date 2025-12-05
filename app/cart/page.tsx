// app/cart/page.tsx ← KOMPLETT ERSETZEN

"use client";

import { useCart } from "@/lib/cartStore";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-8 font-display">
          Warenkorb ist leer
        </h1>
        <Link
          href="/"
          className="text-2xl text-[#e63946] font-bold hover:underline transition"
        >
          ← Zurück zum Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-12 px-6 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-center text-[#e63946] mb-12 md:mb-16 font-display">
          Dein Warenkorb
        </h1>

        <div className="bg-[#0f0f0f] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-6 py-8 border-b border-gray-800 last:border-0"
              >
                {/* Produktname */}
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-bold">{item.name}</p>
                </div>

                {/* Menge */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-2xl font-bold transition"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-2xl font-black">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-12 h-12 rounded-full bg-[#e63946] hover:bg-[#c1121f] flex items-center justify-center text- text-2xl font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* Preis + Entfernen */}
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black text-[#e63946]">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-red-500 hover:text-red-400 mt-3 transition"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}

            {/* Gesamtpreis */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex justify-between items-center mb-10">
                <span className="text-3xl md:text-4xl font-black">Gesamt</span>
                <span className="text-4xl md:text-6xl font-black text-[#e63946]">
                  {getTotalPrice().toFixed(2)} €
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link
                  href="/"
                  className="block text-center py-5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-bold text-lg transition transform hover:-translate-y-1"
                >
                  Weiter einkaufen
                </Link>
                <button className="py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] rounded-2xl font-black text-xl shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-red-900">
                  Zur Kasse →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}