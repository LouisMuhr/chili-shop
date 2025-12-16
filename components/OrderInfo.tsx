// components/OrderInfo.tsx ← neu anlegen!

"use client";

import Image from "next/image";

type Order = {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  pickup: boolean;
  email: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  address?: {
    street: string;
    houseNumber: string;
    doorNumber: string;
    city: string;
    zip: string;
    country: string;
  };
};

type OrderInfoProps = {
  order: Order;
  onClose: () => void;
};

export default function OrderInfo({ order, onClose }: OrderInfoProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-6"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-[#111111] to-black rounded-3xl shadow-2xl border border-gray-800 max-w-4xl w-full p-10 md:p-16 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-light transition"
        >
          ×
        </button>

        <div className="space-y-10">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-5xl font-black text-white mb-4">
              Bestellung {order.orderNumber}
            </h2>
            <p className="text-xl text-gray-400">
              {new Date(order.date).toLocaleString("de-DE")}
            </p>
            <p
              className={`mt-4 text-2xl font-bold ${
                order.status.includes("Online")
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {order.status}
            </p>
            {order.pickup && (
              <p className="mt-4 text-xl text-blue-400 font-bold">
                Abholung vor Ort
              </p>
            )}
          </div>

          {/* Kundeninfo */}
          <div className="bg-gray-900/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4">Kundendaten</h3>
            <p className="text-lg text-gray-300">
              <strong>E-Mail:</strong> {order.email}
            </p>
            {!order.pickup && order.address && (
              <div className="mt-4 space-y-2 text-gray-300">
                <p>
                  <strong>Lieferadresse:</strong>
                </p>
                <p>
                  {order.address.street} {order.address.houseNumber}
                  {order.address.doorNumber && ` / ${order.address.doorNumber}`}
                </p>
                <p>
                  {order.address.zip} {order.address.city}
                </p>
                <p>{order.address.country}</p>
              </div>
            )}
          </div>

          {/* Produkte */}
          <div className="bg-gray-900/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-6">Bestellte Produkte</h3>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-xl font-bold">{item.name}</p>
                    <p className="text-lg text-yellow-400">
                      Menge: {item.quantity}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-[#e63946]">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gesamtpreis */}
          <div className="text-center pt-6 border-t border-gray-800">
            <p className="text-5xl font-black text-[#e63946]">
              Gesamt: {order.total.toFixed(2)} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
