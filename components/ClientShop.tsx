// components/ClientShop.tsx
"use client";

import { useCart } from "../lib/cartStore";
import Image from "next/image";
import { products } from "../data/products";

export default function ClientShop() {
  const { addItem } = useCart();

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center text-[#e63946] mb-12 font-display">
          Unsere feurigen Produkte
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100"
            >
              {/* Bild + SHU Badge */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                <Image
                  src={p.image || "/Roller.jpeg"}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-gray-800">
                    {p.hotness.toLocaleString("de-DE")} SHU
                  </span>
                </div>
              </div>

              {/* Inhalt */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {p.name}
                </h3>

                {/* Schärfegrad Chilis */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < (p.spiciness ?? 0) ? "Chili" : "Chili"}
                    </span>
                  ))}
                </div>

                {/* Preis + Button in einer Zeile */}
                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#e63946]">
                      {p.price.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-600">€</span>
                  </div>

                  <button
                    onClick={() =>
                      addItem({ id: p.id, name: p.name, price: p.price })
                    }
                    className="px-6 py-3 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                  >
                    Warenkorb
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
