"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number | string; // Erlaubt String für leere Eingaben
  hotness: number | string;
  spiciness: number;
  image?: string;
  discountPercent?: number | string;
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
    // Vor dem Speichern leere Strings zurück in 0 konvertieren
    const cleanedProducts = products.map(p => ({
      ...p,
      price: p.price === "" ? 0 : Number(p.price),
      hotness: p.hotness === "" ? 0 : Number(p.hotness),
      discountPercent: p.discountPercent === "" ? 0 : Number(p.discountPercent)
    }));

    await fetch("/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedProducts),
    });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
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
        discountPercent: 0,
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
    <div className="min-h-screen bg-[#0f172a] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mb-12 pt-16 md:pt-24 gap-6">
        <div>
          <h1 className="text-4xl font-black text-red-500 tracking-tight">ADMIN EDITOR</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={addProduct} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all">+ Neues Produkt</button>
          <button onClick={saveProducts} className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-2xl font-bold text-sm shadow-lg shadow-red-900/20 transition-all">Speichern</button>
        </div>
      </div>

      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl">✓ Gespeichert</div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <div key={p.id} className="bg-[#1e293b] rounded-[2.5rem] p-6 border border-gray-800 shadow-2xl flex flex-col transition-transform hover:scale-[1.01]">
            
            {/* Bild Upload */}
            <div className="mb-6 h-52 relative group">
              {p.image ? (
                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                  <button onClick={() => updateProduct(i, "image", "")} className="absolute top-3 right-3 bg-black/60 hover:bg-red-600 p-2 rounded-xl backdrop-blur-md transition-colors">✕</button>
                </div>
              ) : (
                <label className="block cursor-pointer h-full">
                  <div className="h-full border-2 border-dashed border-gray-700 rounded-3xl flex flex-col items-center justify-center hover:border-red-500/50 hover:bg-gray-800/50 transition-all bg-gray-900/30">
                    <span className="text-3xl mb-2">📸</span>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Bild Upload</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(i, e.target.files[0])} />
                </label>
              )}
            </div>

            <input
              value={p.name}
              onChange={(e) => updateProduct(i, "name", e.target.value)}
              className="w-full text-2xl font-black bg-transparent border-b border-gray-700 focus:border-red-500 focus:outline-none mb-8 pb-1 tracking-tight"
            />

            <div className="space-y-6 flex-grow">
              {/* Preis & Rabatt Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 group">
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 ml-1">Preis</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                    <input
                      type="number"
                      step="0.1"
                      // Korrektur: Fallback auf leeren String verhindert NaN Fehler
                      value={p.price ?? ""} 
                      onChange={(e) => updateProduct(i, "price", e.target.value)}
                      className="w-full bg-black/20 border border-gray-700 pl-10 pr-4 py-4 rounded-2xl text-white text-xl font-bold focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 text-right">Rabatt</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={p.discountPercent ?? ""}
                      onChange={(e) => updateProduct(i, "discountPercent", e.target.value)}
                      className="w-full bg-black/20 border border-gray-700 px-4 py-4 rounded-2xl text-white text-xl font-bold text-center focus:border-emerald-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">%</span>
                  </div>
                </div>
              </div>

              {/* SHU Row */}
              <div className="group">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Schärfegrad (SHU)</label>
                  <span className="text-[10px] text-orange-500 font-mono font-bold bg-orange-500/10 px-2 py-0.5 rounded-md">
                    {p.hotness ? Number(p.hotness).toLocaleString() : "0"}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔥</span>
                  <input
                    type="number"
                    value={p.hotness ?? ""}
                    onChange={(e) => updateProduct(i, "hotness", e.target.value)}
                    className="w-full bg-black/20 border border-gray-700 pl-12 pr-4 py-4 rounded-2xl text-white text-xl font-bold focus:border-orange-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Intensität */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-4">
                   <label className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Intensität</label>
                   <span className="text-xs font-bold text-red-500 uppercase">{p.spiciness} Chili</span>
                </div>
                <input
                  type="range" min="1" max="5" value={p.spiciness}
                  onChange={(e) => updateProduct(i, "spiciness", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>
            </div>

            <button
              onClick={() => setProducts((prev) => prev.filter((_, idx) => idx !== i))}
              className="w-full mt-8 py-4 bg-gray-900/50 hover:bg-red-950/30 hover:text-red-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-red-900/50"
            >
              Produkt Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}