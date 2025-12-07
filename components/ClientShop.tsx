// components/ClientShop.tsx ← KOMPLETT ERSETZEN!

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";
import ProductInfo from "@/components/ProductInfo";
import PriceDisplay from "@/components/PriceDisplay";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
          <div className="text-4xl text-[#e63946] font-black animate-pulse">
            Lade Produkte...
          </div>
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
      {/* Noise + Grid + Glow */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      ></div>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      ></div>
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.02) 100px, rgba(255,255,255,0.02) 200px)`,
        }}
      ></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-red-950/15 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-orange-950/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-red-900/8 via-transparent to-transparent blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0, passen,0.4)_100%)] pointer-events-none"></div>

      {/* Hero */}
      <header className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-red-600/10 backdrop-blur-sm border border-red-600/20 rounded-full shadow-2xl">
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">
              Extrem scharf
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Zizu
            </span>
            <br />
            <span className="text-white">Peppers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Die schärfsten Chilis der Welt –{" "}
            <span className="text-red-400 font-semibold">handverlesen</span> und{" "}
            <span className="text-orange-400 font-semibold">extrem heiß</span>
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

      {/* Products */}
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
                  onClick={() => setSelectedProduct(p)}
                  className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/40 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 cursor-pointer flex flex-col"
                >
                  {/* Bild - größeres Aspect Ratio */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.image || "/images/fallback.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* SHU Badge - oben links */}
                    <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm text-black font-bold px-4 py-2 rounded-full text-sm shadow-xl">
                      {p.hotness.toLocaleString("de-DE")} SHU
                    </div>

                    {/* Rabatt Badge - oben rechts */}
                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-5 py-3 rounded-xl text-lg backdrop-blur-sm shadow-xl border-2 border-red-700 transform rotate-6">
                        −{discount}%
                      </div>
                    )}

                    {/* Info direkt auf dem Bild */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <h3 className="text-2xl font-black text-white leading-tight line-clamp-2">
                        {p.name}
                      </h3>

                      <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg transition-opacity ${
                              i < p.spiciness ? "opacity-100" : "opacity-20"
                            }`}
                          >
                            🌶️
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preis + Button - mehr Padding */}
                  <div className="p-6 space-y-4">
                    <PriceDisplay
                      originalPrice={p.price}
                      discountPercent={p.discountPercent}
                      className="text-2xl font-black"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const finalPrice =
                          p.price * (1 - (p.discountPercent ?? 0) / 100);
                        addItem({ id: p.id, name: p.name, price: finalPrice });
                      }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
                    >
                      Warenkorb
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Produkt-Modal */}
      {selectedProduct && (
        <ProductInfo
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <div className="h-24"></div>
    </div>
  );
}
