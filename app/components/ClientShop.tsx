// src/components/ClientShop.tsx
"use client";

import { products } from "@/data/products";
import { useCart } from "@/lib/cartStore";

export default function ClientShop() {
  return (
    <main className="min-h-screen bg-[#fffaf7]">
      {/* Hero Section */}
      <section className="relative py-2 overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
        <div className="max-w-5xl mx-auto px-3 text-center">
          <h2 className="font-display text-6xl md:text-7xl font-bold text-[#e63946] mb-6 leading-tight">
            Chili Inferno
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            blabla
          </p>
        </div>
      </section>

      {/* Produkt Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((p) => {
            const addItem = useCart((state) => state.addItem);

            return (
              <article
                key={p.id}
                className="group relative bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30"
              >
                {/* Glanz beim Hovern */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Bild */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image || "/images/fallback-chili.jpg"}
                    alt={p.name}
                    className="w-full h-full object-cover ..."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <p className="text-sm font-bold text-[#e63946] tracking-wider">
                      {p.hotness || "Extrem scharf"}
                    </p>
                  </div>
                </div>

                {/* Inhalt */}
                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold mb-3 text-gray-900 line-clamp-2">
                    {p.name}
                  </h3>

                  {/* Schärfegrad */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">
                        {i < (p.spiciness ?? 0) ? "Chili" : "Chili"}
                      </span>
                    ))}
                  </div>

                  {/* Preis + Button in einer Zeile */}
                  <div className="flex items-center justify-between gap-6">
                    <span className="font-display text-4xl font-bold text-[#e63946] tracking-tight">
                      {p.price.toFixed(2)} €
                    </span>

                    <button
                      onClick={() =>
                        addItem({ id: p.id, name: p.name, price: p.price })
                      }
                      className="relative px-7 py-4 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-semibold rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <span className="relative z-10">In den Warenkorb</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
