// app/cart/page.tsx ← einfach komplett ersetzen!

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
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-8">
          Warenkorb ist leer
        </h1>
        <Link href="/" className="text-xl text-[#e63946] hover:underline">
          ← Zurück zum Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center text-[#e63946] mb-10">
          Dein Warenkorb
        </h1>

        <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl border border-gray-800">
          <div className="p-5 md:p-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 border-b border-gray-800 last:border-0"
              >
                {/* Name */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg md:text-xl font-bold">{item.name}</p>
                </div>

                {/* Menge */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xl font-bold transition"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-xl font-black">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-9 h-9 rounded-full bg-[#e63946] hover:bg-[#c1121f] flex items-center justify-center text-xl font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* Preis + Entfernen */}
                <div className="text-center sm:text-right">
                  <p className="text-xl md:text-2xl font-black text-[#e63946]">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-400 mt-2 transition"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}

            {/* Gesamt */}
            <div className="pt-6 border-t border-gray-800">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl md:text-3xl font-black">Gesamt</span>
                <span className="text-3xl md:text-4xl font-black text-[#e63946]">
                  {getTotalPrice().toFixed(2)} €
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="block text-center py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition"
                >
                  Weiter einkaufen
                </Link>
                <Link
                  href="/checkout"
                  className="block text-center py-4 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] rounded-xl font-black text-lg shadow-xl transition-all duration-300 border border-red-900"
                >
                  Zur Kasse →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}