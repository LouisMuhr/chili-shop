// components/AdminPanel.tsx ← KOMPLETT ERSETZEN (nur das!)

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
  discountPercent?: number; // ← NEU: Rabatt in Prozent
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    if (!hasMounted) return;
    fetch("/admin/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hasMounted]);

  const saveProducts = async () => {
    await fetch("/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });

    setToast(true);
    setTimeout(() => setToast(false), 960); // verschwindet nach 2 Sekunden
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
        discountPercent: 0, // ← Standardwert
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
    const res = await fetch("/admin/upload", {
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
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10 pt-20 md:pt-24">
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

      {/* Schöner Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-2xl border border-green-400 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save
          </div>
        </div>
      )}

      {/* Kompakte Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
          >
            {/* Bild */}
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

            {/* Preis + Rabatt */}
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
                <label className="text-gray-400 text-xs">Rabatt %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={p.discountPercent ?? 0}
                  onChange={(e) =>
                    updateProduct(
                      i,
                      "discountPercent",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-gray-700 px-3 py-2 rounded text-sm mt-1"
                  placeholder="0"
                />
              </div>
            </div>

            {/* SHU */}
            <div className="my-6">
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

            {/* Schärfe */}
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
