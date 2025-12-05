// components/AdminPanel.tsx ← KOMPLETT ERSETZEN

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    if (!hasMounted) return;
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hasMounted]);

  const saveProducts = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    alert("Gespeichert!");
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "Neues Produkt",
        price: 19.99,
        hotness: 100000,
        spiciness: 3,
      },
    ]);
  };

  const updateProduct = (i: number, field: keyof Product, value: any) => {
    const updated = [...products];
    updated[i] = { ...updated[i], [field]: value };
    setProducts(updated);
  };

  const handleImageUpload = async (i: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) updateProduct(i, "image", data.url);
  };

  if (!hasMounted || loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-6">
      {/* Kompakter Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-red-500 font-display">
          Admin – Produkt-Editor
        </h1>
        <div className="flex gap-4">
          <button
            onClick={addProduct}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-sm shadow-lg"
          >
            + Neu
          </button>
          <button
            onClick={saveProducts}
            className="px-7 py-2.5 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-sm shadow-lg"
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Kompakte Cards – alles auf eine Seite */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
          >
            {/* Bild – kompakt */}
            <div className="mb-6">
              {p.image ? (
                <div className="relative h-48 rounded-xl overflow-hidden border-2 border-dashed border-gray-600">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => updateProduct(i, "image", "")}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="h-48 border-4 border-dashed border-gray-600 rounded-xl flex items-center justify-center hover:border-red-500 transition bg-gray-900/50">
                    <p className="text-gray-400 text-sm text-center">
                      Bild hochladen
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleImageUpload(i, e.target.files[0])
                    }
                  />
                </label>
              )}
            </div>

            <input
              value={p.name}
              onChange={(e) => updateProduct(i, "name", e.target.value)}
              className="w-full text-xl font-bold bg-transparent border-b border-gray-600 focus:border-red-500 focus:outline-none mb-4"
            />

            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <label className="text-gray-400 text-xs">Preis €</label>
                <input
                  type="number"
                  step="0.01"
                  value={p.price}
                  onChange={(e) =>
                    updateProduct(i, "price", parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-gray-700 px-3 py-2 rounded text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs">SHU</label>
                <input
                  type="number"
                  value={p.hotness}
                  onChange={(e) =>
                    updateProduct(i, "hotness", parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-gray-700 px-3 py-2 rounded text-sm mt-1"
                />
              </div>
            </div>

            <div className="my-6">
              <label className="text-gray-400 text-xs block mb-2">
                Schärfe
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={p.spiciness}
                onChange={(e) =>
                  updateProduct(i, "spiciness", parseInt(e.target.value))
                }
                className="w-full accent-red-500"
              />
              <div className="text-center text-lg mt-2">
                {p.spiciness} Chili
              </div>
            </div>

            <button
              onClick={() =>
                setProducts((prev) => prev.filter((_, idx) => idx !== i))
              }
              className="w-full py-2.5 bg-red-900 hover:bg-red-800 rounded-xl text-sm font-bold"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
