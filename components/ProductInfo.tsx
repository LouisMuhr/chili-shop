// components/ProductInfo.tsx ← KOMPLETT ERSETZEN!

"use client";

import Image from "next/image";
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

type ProductInfoProps = {
  product: Product;
  onClose: () => void;
  showToast: () => void; // ← das hier!
};

export default function ProductInfo({
  product,
  onClose,
  showToast,
}: ProductInfoProps) {
  const { addItem } = useCart();

  const discount = product.discountPercent ?? 0;
  const finalPrice = product.price * (1 - discount / 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-6"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-[#111111] to-black rounded-3xl shadow-2xl border border-gray-800 max-w-4xl w-full p-10 md:p-16 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-light"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product.image || "/images/fallback.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-white font-display">
              {product.name}
            </h2>

            <div className="text-7xl font-black text-[#e63946]">
              {finalPrice.toFixed(2)}€
            </div>

            <div className="text-3xl text-orange-500 font-bold">
              {product.hotness.toLocaleString("de-DE")} SHU
            </div>

            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg transition-opacity ${
                    i < product.spiciness ? "opacity-100" : "opacity-20"
                  }`}
                >
                  🌶️
                </span>
              ))}
            </div>

            {discount > 0 && (
              <div className="inline-block bg-red-600 text-white font-black px-6 py-3 rounded-full text-xl shadow-lg border-2 border-red-700">
                −{discount}% Rabatt
              </div>
            )}

            <button
              onClick={() => {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: finalPrice,
                });
                showToast(); // ← jetzt funktioniert's!
                onClose();
              }}
              className="w-full py-6 bg-[#e63946] hover:bg-[#c1121f] text-white font-black text-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Warenkorb!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
