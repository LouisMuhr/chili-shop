// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function Navbar() {
  const items = useCart((s) => s.items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalItems = useCart((s) => s.getTotalItems());

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo / Shop-Name */}
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-[#ee3a38]">Chili Inferno</h1>
        </Link>

        {/* Warenkorb-Button – schön kompakt */}
        <Link
          href="/cart"
          className="relative px-8 py-4 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span>Warenkorb</span>
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-[#f4a261] text-black font-black rounded-full h-9 w-9 flex items-center justify-center shadow-lg text-sm">
              {totalItems}
            </span>
          )}
          <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    </header>
  );
}
