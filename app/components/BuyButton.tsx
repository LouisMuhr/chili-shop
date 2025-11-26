"use client";
import { useCart } from "@/lib/cartStore";

export default function BuyButton({
  product,
}: {
  product: { id: string; name: string; price: number };
}) {
  const addItem = useCart((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="
    relative 
    bg-gradient-to-b from-[#222222] to-[#000000]
    text-white px-5 py-3 rounded-xl font-bold text-sm
    shadow-md
    overflow-hidden
    transition
    hover:from-[#333333] hover:to-[#000000]
    whitespace-nowrap
  "
    >
      {/* Gloss Highlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl
    bg-gradient-to-t from-transparent via-white/10 to-white/20
    opacity-40
  "
      ></span>
      Add to cart
    </button>
  );
}
