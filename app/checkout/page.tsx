// app/checkout/page.tsx ← KOMPLETT ERSETZEN!

"use client";

import { useCart } from "@/lib/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [pickup, setPickup] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const total = getTotalPrice();

  const handleCheckout = async () => {
    setError(null);
    setSuccess(false);

    if (!email) {
      setError("Bitte gib deine E-Mail-Adresse an");
      return;
    }

    setLoading(true);

    try {
      const order = {
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
        email,
        pickup,
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        setSuccess(true);
        setTimeout(() => {
          window.location.href = `/checkout/success?order=${data.orderNumber}&pickup=${pickup}`;
        }, 1500);
      } else {
        setError("Fehler beim Speichern der Bestellung");
      }
    } catch (err) {
      setError("Verbindungsfehler – bitte versuche es erneut");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center text-[#e63946] mb-10">
          Checkout
        </h1>

        <div className="bg-[#0f0f0f] rounded-2xl p-6 md:p-10 shadow-2xl border border-gray-800">
          {/* E-Mail */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3">Deine E-Mail (für Bestätigung)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="w-full px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              required
            />
          </div>

          {/* Lieferoption */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Lieferoption</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input type="radio" name="delivery" checked={!pickup} onChange={() => setPickup(false)} className="w-5 h-5 text-[#e63946]" />
                <div>
                  <p className="text-lg font-bold">Versand nach Hause</p>
                  <p className="text-gray-400 text-sm">+ Versandkosten (später)</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input type="radio" name="delivery" checked={pickup} onChange={() => setPickup(true)} className="w-5 h-5 text-[#e63946]" />
                <div>
                  <p className="text-lg font-bold">Abholung vor Ort</p>
                  <p className="text-gray-400 text-sm">Zahle bar oder mit Karte bei Abholung</p>
                </div>
              </label>
            </div>
          </div>

          {/* Fehlermeldung */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded-xl text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Erfolgsmeldung */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-600 rounded-xl text-green-300 text-center font-bold">
              Bestellung erfolgreich gespeichert! Weiterleitung...
            </div>
          )}

          <div className="text-right mb-8">
            <p className="text-3xl md:text-4xl font-black text-[#e63946]">
              Gesamt: {total.toFixed(2)} €
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || success}
            className="w-full py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] text-white font-black text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Wird verarbeitet..." : success ? "Erfolgreich!" : pickup ? "Bestellung für Abholung bestätigen" : "Zur Zahlung →"}
          </button>

          {pickup && (
            <p className="text-center text-gray-400 mt-6 text-sm">
              Adresse: [Deine Adresse hier] · Öffnungszeiten: Mo–Sa 10–18 Uhr
            </p>
          )}
        </div>
      </div>
    </div>
  );
}