// components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartStore";

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism Container */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="group">
              <h1 className="text-3xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-orange-500 transition-all duration-300">
                  Zizu
                </span>
                <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                  Peppers
                </span>
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <Link 
                href="/admin"
                className={`text-lg font-semibold transition-all duration-300 ${
                  pathname === '/shop' 
                    ? 'text-red-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Shop
              </Link>
              
              <Link 
                href="/about"
                className={`text-lg font-semibold transition-all duration-300 ${
                  pathname === '/about' 
                    ? 'text-red-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Über uns
              </Link>

              {/* Cart Button */}
              <Link 
                href="/cart"
                className="relative group"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Warenkorb</span>
                  
                  {/* Item Count Badge */}
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}