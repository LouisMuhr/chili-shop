// app/checkout/page.tsx ← KOMPLETT ERSETZEN!

"use client";

import { useCart, CartItem } from "@/lib/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    country: "",
    street: "",
    zip: "",
    city: "",
  });
  const [deliveryOption, setDeliveryOption] = useState<"home" | "courier" | "local" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = getTotalPrice();

  // Zonen & Sofia
  const isBulgaria = address.country === "BG";
  const isAustria = address.country === "AT";
  const sofiaZips = ["1000", "1300", "1400", "1500", "1600", "1700"];
  const isSofia = isBulgaria && sofiaZips.some((p) => address.zip.startsWith(p));

  // Verfügbare Optionen
  const availableOptions = {
    home: true,
    courier: isBulgaria,
    local: isBulgaria && isSofia,
  };

  // Versandkosten in € (BGN umgerechnet ca. 1 BGN = 0.51 € – hier einfach gerundet)
  const shippingCosts = {
    home: isBulgaria ? 3.50 : isAustria ? 4.99 : 9.99,
    courier: 2.50, // ca. 4.99 BGN
    local: 0,
  };

  const shippingCost = deliveryOption ? shippingCosts[deliveryOption] : 0;
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Bitte gib deine E-Mail-Adresse an");
      setLoading(false);
      return;
    }

    if (!address.country) {
      setError("Bitte wähle ein Land aus");
      setLoading(false);
      return;
    }

    if (deliveryOption === null) {
      setError("Bitte wähle eine Lieferoption");
      setLoading(false);
      return;
    }

    try {
      let status = "Online - bezahlt";
      if (deliveryOption === "local") status = "Abholung vor Ort - nicht bezahlt";
      if (deliveryOption === "courier") status = "Abholung Kurier - bezahlt"; // ← geändert!

      const order = {
        items: items.map((i: CartItem) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal,
        shippingCost,
        total,
        email,
        address: address, // ← Adresse immer speichern (auch bei Kurier!)
        deliveryOption,
        status,
        date: new Date().toISOString(),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = `/checkout/success?order=${data.orderNumber}`;
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

          {/* Lieferadresse */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Lieferadresse</h2>

            <select
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full px-5 py-4 bg-gray-900 rounded-xl text-white mb-6"
            >
              <option value="">Land auswählen</option>
              <option value="BG">Bulgarien</option>
              <option value="AT">Österreich</option>
              <option value="DE">Deutschland</option>
            </select>

            {address.country && (
              <>
                <input
                  type="text"
                  placeholder="Straße und Hausnummer"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="PLZ"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Ort"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="px-5 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Lieferoptionen */}
          {address.country && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-5">Lieferoption</h2>
              <div className="space-y-4">
                {availableOptions.home && (
                  <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "home"}
                      onChange={() => setDeliveryOption("home")}
                      className="w-5 h-5 text-[#e63946]"
                    />
                    <div>
                      <p className="text-lg font-bold">Versand nach Hause</p>
                      <p className="text-gray-400 text-sm">
                        Versandkosten: {shippingCosts.home.toFixed(2)} €
                      </p>
                    </div>
                  </label>
                )}

                {availableOptions.courier && (
                  <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "courier"}
                      onChange={() => setDeliveryOption("courier")}
                      className="w-5 h-5 text-[#e63946]"
                    />
                    <div>
                      <p className="text-lg font-bold">Abholung bei Kurier-Filiale (Speedy/Econt)</p>
                      <p className="text-gray-400 text-sm">
                        Versandkosten: {shippingCosts.courier.toFixed(2)} €
                      </p>
                    </div>
                  </label>
                )}

                {availableOptions.local && (
                  <label className="flex items-center gap-4 p-5 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "local"}
                      onChange={() => setDeliveryOption("local")}
                      className="w-5 h-5 text-[#e63946]"
                    />
                    <div>
                      <p className="text-lg font-bold">Abholung vor Ort (Sofia)</p>
                      <p className="text-gray-400 text-sm">Kostenlos</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Fehlermeldung */}
          {error && (
            <div className="mb-8 p-5 bg-red-900/50 border border-red-600 rounded-xl text-red-300 text-center font-bold">
              {error}
            </div>
          )}

          {/* Gesamtpreis */}
          <div className="text-right mb-8 space-y-2">
            <p className="text-xl text-gray-400">Warenkorb: {subtotal.toFixed(2)} €</p>
            <p className="text-xl text-gray-400">
              Versand: {shippingCost.toFixed(2)} €
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#e63946]">
              Gesamt: {total.toFixed(2)} €
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || !deliveryOption}
            className="w-full py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9b0f1a] text-white font-black text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Wird verarbeitet..." : "Bestellung abschließen"}
          </button>
        </div>
      </div>
    </div>
  );
}