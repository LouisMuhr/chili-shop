// app/checkout/page.tsx
"use client";

import { useCart } from "@/lib/cartStore";

export default function CheckoutPage() {
  const { getTotalPrice, items } = useCart();

  const handleCheckout = async () => {
    // Hier kommt später Mollie rein
    const res = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: getTotalPrice(),
        description: `Bestellung #${Date.now()}`,
        items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      }),
    });

    const data = await res.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Zahlung momentan nicht möglich – Mollie-Key fehlt noch");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[#e63946] mb-8">Checkout</h1>
        <p className="text-4xl mb-12">Gesamt: {getTotalPrice().toFixed(2)} €</p>

        <button
          onClick={handleCheckout}
          className="px-16 py-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black text-3xl rounded-3xl shadow-2xl transform hover:scale-105 transition-all"
        >
          Jetzt bezahlen
        </button>

        <p className="text-gray-500 mt-8 text-sm">
          (Mollie-Integration kommt, sobald du den API-Key hast)
        </p>
      </div>
    </div>
  );
}