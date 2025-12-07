// components/ClientShop.tsx ← KOMPLETT ERSETZEN!

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";

type Product = {
  id: string;
  name: string;
  price: number;
  hotness: number;
  spiciness: number;
  image?: string;
  discountPercent?: number;
};

export default function ClientShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/data/products.json?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent"></div>
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4 animate-pulse">Chili</div>
          <div className="text-4xl text-[#e63946] font-black animate-pulse">Lade Produkte...</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 flex items-center justify-center">
        <div className="text-3xl text-gray-400">Noch keine Produkte</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 relative overflow-hidden">

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-red-600/10 backdrop-blur-sm border border-red-600/20 rounded-full shadow-2xl">
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">Extrem scharf</span>
          </div>
         
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Zizu
            </span>
            <br />
            <span className="text-white">Peppers</span>
          </h1>
         
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Die schärfsten Chilis der Welt –
            <span className="text-red-400 font-semibold"> handverlesen</span> und
            <span className="text-orange-400 font-semibold"> extrem scharf</span>
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/100 shadow-lg">
              Schneller Versand
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/100 shadow-lg">
              Bis 2.2 Mio SHU
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/100 shadow-lg">
              Premium Qualität
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              Unsere Chilis
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((p) => {
              const discount = p.discountPercent ?? 0;
              const hasDiscount = discount > 0;
              const finalPrice = p.price * (1 - discount / 100);

              return (
                <article
                  key={p.id}
                  className="group relative bg-gradient-to-b from-[#111111] to-black rounded-3xl overflow-hidden border border-gray-900 shadow-2xl hover:border-[#e63946]/60 transition-all duration-500 hover:shadow-[#e63946]/30 hover:-translate-y-3 flex flex-col"
                >
                  <div className="relative aspect-[5/6] bg-black overflow-hidden">
                    <Image
                      src={p.image || "/images/fallback.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-orange-500 text-black font-bold px-4 py-2 rounded-full text-xs shadow-xl border border-orange-400">
                      {p.hotness.toLocaleString("de-DE")} SHU
                    </div>

                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-5 py-3 rounded-2xl text-lg shadow-2xl border-2 border-red-700 transform rotate-6">
                        −{discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div className="text-center space-y-8">
                      <h3 className="text-3xl md:text-2xl font-black text-white font-display leading-tight min-h-6 flex items-center justify-center">
                        {p.name}
                      </h3>

                      <div className="flex justify-center gap-4">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl transition-all ${
                              i < p.spiciness ? "text-[#e63946]" : "text-gray-700"
                            }`}
                          >
                            Chili
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 mt-10">
                      <div className="text-left">
                        {hasDiscount && (
                          <span className="block text-lg text-gray-500 line-through">
                            {p.price.toFixed(2)}€
                          </span>
                        )}
                        <span className="text-2xl font-black text-[#e63946] tracking-tighter">
                          {finalPrice.toFixed(2)}€
                        </span>
                      </div>

                      <button
                        onClick={() => addItem({ id: p.id, name: p.name, price: finalPrice })}
                        className="px-4 py-4 bg-[#e63946] hover:bg-[#c1121f] text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-[#e63946]/60 transform hover:scale-105 transition-all duration-300 border-2 border-red-800 whitespace-nowrap flex-shrink-0"
                      >
                        Warenkorb
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-24"></div>
    </div>
  );
}