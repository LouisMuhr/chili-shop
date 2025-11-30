// components/AdminPanel.tsx  ← KOPIERE DAS 1:1

"use client";

import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  hotness: number;
  spiciness: number;
  image?: string;
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // Hydration-Killer

  // Erst nach Client-Mount aktiv werden
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Nur auf dem Client laden
  useEffect(() => {
    if (!hasMounted) return;

    fetch("/api/admin/products")
      .then(r => r.json())
      .then(data => {
        setProducts(data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setIsLoading(false);
      });
  }, [hasMounted]);

  const saveProducts = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    alert("Produkte gespeichert!");
  };

  const addProduct = () => {
    setProducts(prev => [...prev, {
      id: Date.now().toString(),
      name: "Neues Produkt",
      price: 19.99,
      hotness: 100000,
      spiciness: 3,
    }]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // WICHTIG: Solange nicht gemountet → absolut nichts rendern (verhindert Mismatch)
  if (!hasMounted) {
    return null; // oder <div className="min-h-screen bg-black" />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Lade Produkte...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black text-red-500 font-display">Admin – Produkte</h1>
          <div className="flex gap-4">
            <button onClick={addProduct} className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold">
              + Neues Produkt
            </button>
            <button onClick={saveProducts} className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold">
              Alle speichern
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div key={p.id} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <input
                value={p.name}
                onChange={e => {
                  const updated = [...products];
                  updated[i].name = e.target.value;
                  setProducts(updated);
                }}
                className="w-full text-2xl font-bold bg-transparent border-b-2 border-red-500 focus:outline-none mb-4"
              />

              <div className="grid grid-cols-2 gap-4 my-6">
                <div>
                  <label className="text-gray-400 text-sm">Preis €</label>
                  <input
                    type="number"
                    step="0.01"
                    value={p.price}
                    onChange={e => {
                      const updated = [...products];
                      updated[i].price = parseFloat(e.target.value) || 0;
                      setProducts(updated);
                    }}
                    className="w-full bg-gray-800 px-4 py-3 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">SHU</label>
                  <input
                    type="number"
                    value={p.hotness}
                    onChange={e => {
                      const updated = [...products];
                      updated[i].hotness = parseInt(e.target.value) || 0;
                      setProducts(updated);
                    }}
                    className="w-full bg-gray-800 px-4 py-3 rounded-lg mt-1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-400 text-sm">Schärfe (1–5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={p.spiciness}
                  onChange={e => {
                    const updated = [...products];
                    updated[i].spiciness = parseInt(e.target.value);
                    setProducts(updated);
                  }}
                  className="w-full accent-red-500"
                />
                <div className="text-center text-2xl mt-2">{p.spiciness} Chili</div>
              </div>

              <button
                onClick={() => deleteProduct(p.id)}
                className="w-full py-3 bg-red-900 hover:bg-red-800 rounded-lg font-bold transition"
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}