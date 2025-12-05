// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useCart } from "../lib/cartStore";

export default function Navbar() {
  const totalItems = useCart((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-black text-[#e63946]">Zizu peppers</h1>
        </Link>

        {/* Warenkorb Button */}
        <Link
          href="/cart"
          className="relative px-8 py-4 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Warenkorb
          </span>

          {/* Badge – OHNE ref, OHNE onClick → kein Hydration-Fehler! */}
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-[#f4a261] text-black font-black text-sm rounded-full size-9 flex items-center justify-center shadow-lg">
              {totalItems}
            </span>
          )}

          {/* Glanz-Effekt */}
          <div className="absolute inset-0 bg-white/20 -translate-y-full transition-transform duration-500 hover:translate-y-0" />
        </Link>
      </div>
    </header>
  );
}