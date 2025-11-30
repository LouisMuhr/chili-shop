// components/ClientShop.tsx
"use client";

import Image from "next/image";
import { useCart } from "@/lib/cartStore";
import { products } from "@/data/products";

export default function ClientShop() {
  const { addItem } = useCart();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-black text-center text-[#e63946] mb-16 font-display">
          Unsere feurigen Produkte
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <article
              key={p.id}
              className="card group overflow-hidden transition-all duration-500 hover:shadow-red-500/20"
            >
              {/* Bild */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <Image
                  src={p.image || "/images/fallback.jpg"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* SHU Badge */}
                <div className="absolute top-4 left-4 badge">
                  {(p.hotness ?? 0).toLocaleString("de-DE")} SHU
                </div>
              </div>

              {/* Inhalt */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3 font-display line-clamp-2">
                  {p.name}
                </h3>

                {/* Schärfe-Skala */}
                <div className="flex justify-center gap-2 my-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < (p.spiciness ?? 0) ? "text-[#e63946]" : "text-gray-700"}>
                      Chili
                    </span>
                  ))}
                </div>

                {/* Preis + Button */}
                <div className="flex items-center justify-between mt-8">
                  <p className="text-4xl font-black text-[#e63946]">
                    {p.price.toFixed(2)}€
                  </p>
                  <button
                    onClick={() => addItem({ id: p.id, name: p.name, price: p.price })}
                    className="btn-primary"
                  >
                    In den Warenkorb
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