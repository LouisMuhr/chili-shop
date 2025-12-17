"use client";

import { useEffect, useState, useCallback } from "react";
import OrderInfo from "@/components/OrderInfo"; // Angenommen, diese Komponente existiert

// Typisierung
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // Es ist besser, einen Zustand für den Ladevorgang der Markierung zu haben,
  // um Doppelklicks zu verhindern. Wir verwenden hier nur einen allgemeinen Ladezustand.
  const [isMarking, setIsMarking] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- HILFSFUNKTIONEN ZUM DATENABRUF ---

  useEffect(() => {
    console.log("successMessage aktuell:", successMessage);
  }, [successMessage]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Füge den Cache-Buster hinzu, um sicherzustellen, dass die neueste JSON-Datei abgerufen wird
      const res = await fetch("/data/orders.json?t=" + Date.now());
      if (!res.ok)
        throw new Error("Netzwerkfehler beim Laden der Bestellungen.");

      const data: Order[] = await res.json();

      // Neueste zuerst sortieren
      const sorted = data.sort(
        (a: Order, b: Order) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setOrders(sorted);
      setFilteredOrders(sorted);
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- NEUE FUNKTION: markAsFinished ---

  // app/admin/orders/page.tsx

  const markAsFinished = async (orderId: number) => {
    if (isMarking) return;

    setIsMarking(true);

    try {
      console.log("Starte markAsFinished für ID:", orderId);
      const res = await fetch("/api/orders/finish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      if (!res.ok) {
        let errorMessage = "Fehler beim Verschieben der Bestellung.";
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = `Serverfehler ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Nur bei Erfolg: Success-Meldung und State aktualisieren
      setSuccessMessage("Bestellung erfolgreich abgeschlossen!");
      setTimeout(() => setSuccessMessage(null), 1100);

      // Bestellung lokal entfernen
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error: any) {
      console.error("markAsFinished Fehler:", error);
      // Optional: Fehlermeldung anzeigen
      // setError(error.message || "Unbekannter Fehler");
    } finally {
      setIsMarking(false);
    }
  };

  // --- useEffect Hooks ---

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Initiales Laden der Bestellungen

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
  }, [search, statusFilter, orders]); // Filterlogik

  // --- Render Logik ---

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
          {search || statusFilter !== "all"
            ? "Keine passenden Bestellungen gefunden"
            : "Noch keine Bestellungen"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {successMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
            <div className="px-8 py-4 bg-green-900/90 border border-green-500 rounded-full text-green-300 text-center font-bold text-lg shadow-2xl backdrop-blur-sm animate-pulse">
              {successMessage}
            </div>
          </div>
        )}
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
            <option value="Abholung - nicht bezahlt">
              Abholung - nicht bezahlt
            </option>
            <option value="Abholung Kurier - bezahlt">
              Abholung Kurier - bezahlt
            </option>
            {/* Hinzufügen weiterer Status, falls nötig */}
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
                    <span className="text-2xl font-black">
                      {order.orderNumber}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(order.date).toLocaleString("de-DE")}
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
                  <p className="text-gray-300 mb-4">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        order.status.includes("nicht")
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="font-bold mb-2">
                      Produkte ({order.items.length}):
                    </p>
                    <ul className="text-gray-300">
                      {order.items.slice(0, 3).map((item, i) => (
                        <li key={i}>
                          {item.quantity} × {item.name}
                        </li>
                      ))}
                      {order.items.length > 3 && (
                        <li>... und {order.items.length - 3} weitere</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-black text-[#e63946] mb-6">
                    {order.total.toFixed(2)} €
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Verhindert, dass das Detail-Modal geöffnet wird
                      markAsFinished(order.id);
                    }}
                    disabled={isMarking} // Button deaktivieren während des Verschiebevorgangs
                    className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    {isMarking ? "Verarbeite..." : "Als fertig markieren"}
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
          onFinished={markAsFinished} // markAsFinished an die Detail-Komponente übergeben
        />
      )}
    </div>
  );
}
