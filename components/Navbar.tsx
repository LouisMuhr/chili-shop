// components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cartStore";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Glassmorphism Container */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-8 py-3 md:py-4 shadow-2xl">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="group">
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-orange-500 transition-all duration-300">
                    Zizu
                  </span>
                  <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                    Peppers
                  </span>
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <Link 
                  href="/admin/select"
                  className={`text-lg font-semibold transition-all duration-300 ${
                    pathname === 'admin/select' 
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

                {/* Cart Button Desktop */}
                <Link 
                  href="/cart"
                  className="relative group"
                >
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Warenkorb</span>
                    
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              {/* Mobile: Cart + Burger Menu */}
              <div className="flex md:hidden items-center gap-3">
                {/* Cart Button Mobile - nur Icon */}
                <Link 
                  href="/cart"
                  className="relative"
                >
                  <div className="p-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-lg">
                    <ShoppingCart className="w-5 h-5" />
                    
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Burger Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 text-white hover:text-red-500 transition-colors"
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed top-24 right-4 left-4 z-50 md:hidden">
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <nav className="flex flex-col gap-4">
                <Link 
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${
                    pathname === '/admin' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Shop
                </Link>
                
                <Link 
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${
                    pathname === '/about' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Über uns
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}