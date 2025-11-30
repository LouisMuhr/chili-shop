// components/ClientShop.tsx

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-4xl font-black text-[#e63946]">Lade Produkte...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-6">
        <div>
          <p className="text-4xl font-bold text-gray-500 mb-4">
            Noch keine Produkte
          </p>
          <p className="text-xl text-gray-400">
            Gehe zu <span className="text-[#e63946] font-bold">/admin</span> und
            füge welche hinzu!
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative bg-gradient-to-b from-[#111111] to-black rounded-3xl overflow-hidden border border-gray-900 shadow-2xl hover:border-[#e63946]/60 transition-all duration-500 hover:shadow-[#e63946]/30 hover:-translate-y-3 flex flex-col"
            >
              {/* Bild + SHU Badge */}
              <div className="relative aspect-[4/5] bg-black overflow-hidden">
                <Image
                  src={p.image || "/images/fallback.jpg"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-orange-500 text-black font-bold px-6 py-3 rounded-full text-base shadow-2xl border-2 border-orange-400">
                  {p.hotness.toLocaleString("de-DE")} SHU
                </div>
              </div>

              {/* Inhalt – flex-grow sorgt für gleiche Höhe */}
              <div className="flex-1 p-10 flex flex-col justify-between">
                <div className="text-center space-y-8">
                  <h3 className="text-3xl md:text-4xl font-black text-white font-display leading-tight min-h-24 flex items-center justify-center">
                    {p.name}
                  </h3>

                  <div className="flex justify-center gap-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl transition-all ${
                          i < p.spiciness
                            ? "text-[#e63946] drop-shadow-glow"
                            : "text-gray-700"
                        }`}
                      >
                        Chili
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preis + Button – immer unten */}
                <div className="flex items-center justify-between gap-6 mt-10">
                  <span className="text-2xl font-black text-[#e63946] tracking-tighter flex-shrink-0">
                    {p.price.toFixed(2)}€
                  </span>
                  <button
                    onClick={() =>
                      addItem({ id: p.id, name: p.name, price: p.price })
                    }
                    className="px-4 py-4 bg-[#e63946] hover:bg-[#c1121f] text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-[#e63946]/60 transform hover:scale-105 transition-all duration-300 border-2 border-red-800 whitespace-nowrap flex-shrink-0"
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
