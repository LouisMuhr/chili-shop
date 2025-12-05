// components/AdminPanel.tsx  ← KOMPLETT ERSETZEN!

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

  useEffect(() => {
    fetch("/api/admin/products")
      .then(r => r.json())
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const saveProducts = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    alert("Produkte gespeichert – Shop aktualisiert sich in 2 Sekunden!");
  };

  const addProduct = () => {
    setProducts([...products, {
      id: Date.now().toString(),
      name: "Neues Produkt",
      price: 19.99,
      hotness: 100000,
      spiciness: 3,
      image: "", // leer → wird per Upload gefüllt
    }]);
  };

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const deleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Bild-Upload mit Drag & Drop
  const handleImageUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("index", index.toString());

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      updateProduct(index, "image", data.url);
    }
  };

  if (loading) return <div className="text-white text-center p-20 text-3xl">Lade Produkte...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-red-500 text-center mb-12 font-display">
          Admin – Produkt-Editor
        </h1>

        <div className="flex justify-center gap-6 mb-12">
          <button onClick={addProduct} className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-xl shadow-xl">
            + Neues Produkt
          </button>
          <button onClick={saveProducts} className="px-10 py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-xl shadow-xl">
            Alle speichern
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, i) => (
            <div key={p.id} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              {/* Bild-Upload-Bereich */}
              <div className="mb-8">
                {p.image ? (
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed border-gray-600">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                    <button
                      onClick={() => updateProduct(i, "image", "")}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-sm"
                    >
                      Entfernen
                    </button>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="aspect-[4/5] border-4 border-dashed border-gray-600 rounded-xl flex items-center justify-center hover:border-red-500 transition">
                      <p className="text-gray-400 text-center">
                        Bild hierher ziehen<br />oder klicken
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(i, e.target.files[0])}
                    />
                  </label>
                )}
              </div>

              <input
                value={p.name}
                onChange={(e) => updateProduct(i, "name", e.target.value)}
                className="w-full text-3xl font-black bg-transparent border-b-2 border-red-500 focus:outline-none mb-6"
              />

              <div className="grid grid-cols-2 gap-6 my-8">
                <div>
                  <label className="text-gray-400">Preis €</label>
                  <input
                    type="number"
                    step="0.01"
                    value={p.price}
                    onChange={(e) => updateProduct(i, "price", parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-700 px-4 py-3 rounded-lg mt-2 text-xl"
                  />
                </div>
                <div>
                  <label className="text-gray-400">SHU</label>
                  <input
                    type="number"
                    value={p.hotness}
                    onChange={(e) => updateProduct(i, "hotness", parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 px-4 py-3 rounded-lg mt-2 text-xl"
                  />
                </div>
              </div>

              <div className="my-8">
                <label className="text-gray-400">Schärfe (1–5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={p.spiciness}
                  onChange={(e) => updateProduct(i, "spiciness", parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="text-center text-4xl mt-4">{p.spiciness} Chili</div>
              </div>

              <button
                onClick={() => deleteProduct(i)}
                className="w-full py-4 bg-red-900 hover:bg-red-800 rounded-xl font-bold text-xl"
              >
                Produkt löschen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}