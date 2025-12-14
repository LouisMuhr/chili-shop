// app/checkout/page.tsx ← KOMPLETT ERSETZEN!

"use client";

import { useCart, CartItem } from "@/lib/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [pickup, setPickup] = useState(true);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = getTotalPrice();

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Bitte gib deine E-Mail-Adresse an");
      setLoading(false);
      return;
    }

    if (!pickup && (!address.street || !address.city || !address.zip || !address.country)) {
      setError("Bitte gib eine vollständige Lieferadresse an");
      setLoading(false);
      return;
    }

    try {
      const order = {
        items: items.map((i: CartItem) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
        email,
        pickup,
        address: pickup ? null : address,
        status: pickup ? "Abholung - nicht bezahlt" : "Online - bezahlt",
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        window.location.href = `/checkout/success?order=${data.orderNumber}&pickup=${pickup}`;
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
            />
          </div>

          {/* Lieferoption */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Lieferoption</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input
                  type="radio"
                  name="delivery"
                  checked={!pickup}
                  onChange={() => setPickup(false)}
                  className="w-5 h-5 text-[#e63946]"
                />
                <div>
                  <p className="text-lg font-bold">Versand nach Hause</p>
                  <p className="text-gray-400 text-sm">+ Versandkosten (später)</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                <input
                  type="radio"
                  name="delivery"
                  checked={pickup}
                  onChange={() => setPickup(true)}
                  className="w-5 h-5 text-[#e63946]"
                />
                <div>
                  <p className="text-lg font-bold">Abholung vor Ort</p>
                  <p className="text-gray-400 text-sm">Zahle bar oder mit Karte bei Abholung</p>
                </div>
              </label>
            </div>
          </div>

          {/* Adresse nur bei Versand */}
          {!pickup && (
            <div className="mb-10 space-y-6">
              <h2 className="text-2xl font-bold">Lieferadresse</h2>
              <input
                type="text"
                placeholder="Straße und Hausnummer"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="PLZ"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                 className="px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
                />
                <input
                  type="text"
                  placeholder="Ort"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
                />
              </div>
              <input
                type="text"
                placeholder="Land"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="w-full px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              />
            </div>
          )}

          {/* Fehlermeldung */}
          {error && (
            <div className="mb-8 p-5 bg-red-900/50 border border-red-600 rounded-xl text-red-300 text-center font-bold">
              {error}
            </div>
          )}

          <div className="text-right mb-8">
            <p className="text-3xl md:text-4xl font-black text-[#e63946]">
              Gesamt: {total.toFixed(2)} €
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] text-white font-black text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Wird verarbeitet..." : pickup ? "Bestellung für Abholung bestätigen" : "Zur Zahlung →"}
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