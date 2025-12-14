// app/admin/orders/page.tsx ← KOMPLETT ERSETZEN!

"use client";

import { useEffect, useState } from "react";
import OrderInfo from "@/components/OrderInfo";

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
    city: string;
    zip: string;
    country: string;
  };
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch("/data/orders.json?t=" + Date.now())
      .then((res) => res.json())
      .then((data) => {
        // Neueste zuerst sortieren
        const sorted = data.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(sorted);
        setFilteredOrders(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          o.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [search, statusFilter, orders]);

  const markAsFinished = async (orderId: number) => {
    const updatedOrders = orders.filter((o) => o.id !== orderId);

    const res = await fetch("/api/admin/orders/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrders),
    });

    if (res.ok) {
      setOrders(updatedOrders);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl">Lade Bestellungen...</p>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-3xl">
          {search || statusFilter !== "all" ? "Keine passenden Bestellungen gefunden" : "Noch keine Bestellungen"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-center text-[#e63946] mb-12">
          Bestellungen
        </h1>

        {/* Suche & Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-6">
          <input
            type="text"
            placeholder="Suche nach Bestellnummer oder E-Mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 bg-gray-900 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-4 bg-gray-900 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          >
            <option value="all">Alle Status</option>
            <option value="Online - bezahlt">Online - bezahlt</option>
            <option value="Abholung - nicht bezahlt">Abholung - nicht bezahlt</option>
          </select>
        </div>

        {/* Bestellliste */}
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0f0f0f] rounded-2xl p-8 shadow-2xl border border-gray-800 cursor-pointer hover:border-[#e63946]/60 transition"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-black">{order.orderNumber}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(order.date).toLocaleString("de-DE")}
                    </span>
                    {order.pickup && (
                      <span className="px-4 py-1 bg-blue-900/50 rounded-full text-blue-400 text-sm">
                        Abholung
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-2"><strong>E-Mail:</strong> {order.email}</p>
                  <p className="text-gray-300 mb-4">
                    <strong>Status:</strong>{" "}
                    <span className={`font-bold ${order.status.includes("Online") ? "text-green-400" : "text-yellow-400"}`}>
                      {order.status}
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="font-bold mb-2">Produkte ({order.items.length}):</p>
                    <ul className="text-gray-300">
                      {order.items.slice(0, 3).map((item, i) => (
                        <li key={i}>
                          {item.quantity} × {item.name}
                        </li>
                      ))}
                      {order.items.length > 3 && <li>... und {order.items.length - 3} weitere</li>}
                    </ul>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-black text-[#e63946] mb-6">
                    {order.total.toFixed(2)} €
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsFinished(order.id);
                    }}
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

      {/* Detail-Modal */}
      {selectedOrder && (
        <OrderInfo
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}