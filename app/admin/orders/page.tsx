// app/admin/orders/page.tsx ← neu anlegen!

"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  pickup: boolean;
  email: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/orders.json?t=" + Date.now())
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAsFinished = async (orderId: number) => {
    const updatedOrders = orders.filter((o) => o.id !== orderId);
    await fetch("/api/admin/orders/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrders),
    });
    setOrders(updatedOrders);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Lade Bestellungen...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-3xl">Noch keine Bestellungen</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-center text-[#e63946] mb-12">
          Bestellungen
        </h1>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0f0f0f] rounded-2xl p-8 shadow-2xl border border-gray-800"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-black">{order.orderNumber}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(order.date).toLocaleDateString("de-DE")}
                    </span>
                    {order.pickup && (
                      <span className="px-4 py-1 bg-blue-900/50 rounded-full text-blue-400 text-sm">
                        Abholung
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-2">
                    <strong>E-Mail:</strong> {order.email}
                  </p>

                  <div className="mt-4">
                    <p className="font-bold mb-2">Produkte:</p>
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-gray-300">
                          {item.quantity} × {item.name} – {(item.price * item.quantity).toFixed(2)} €
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-black text-[#e63946] mb-6">
                    {order.total.toFixed(2)} €
                  </p>

                  <button
                    onClick={() => markAsFinished(order.id)}
                    className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
                  >
                    Als fertig markieren
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}