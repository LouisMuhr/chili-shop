// src/app/cart/page.tsx
"use client";

import { useCart } from "../../lib/cartStore";
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
      <main className="min-h-screen bg-[#fffaf7] flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold text-gray-800 mb-6">
            Warenkorb ist leer
          </h1>
          <Link href="/" className="text-[#e63946] text-2xl underline">
            ← Zurück zum Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-6xl font-bold text-center text-[#e63946] mb-12">
          Dein Warenkorb
        </h1>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 py-6 border-b last:border-0"
            >
              <div className="font-medium text-lg flex-1">{item.name}</div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center text-xl font-bold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-10 h-10 rounded-full bg-[#e63946] text-white hover:bg-[#c1121f] flex items-center justify-center text-xl font-bold"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#e63946]">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline mt-2 transition"
                >
                  Entfernen
                </button>
              </div>
            </div>
          ))}
          <div className="mt-10 pt-8 border-t">
            <div className="flex justify-between text-4xl font-black mb-8">
              <span>Gesamt</span>
              <span className="text-[#e63946]">
                {getTotalPrice().toFixed(2)} €
              </span>
            </div>
            <div className="flex gap-6">
              <Link
                href="/"
                className="flex-1 text-center py-5 bg-gray-200 rounded-2xl font-bold hover:bg-gray-300 transition"
              >
                Weiter einkaufen
              </Link>
              <button className="flex-1 py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white rounded-2xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition">
                Zur Kasse →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
