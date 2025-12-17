// components/AdminSelect.tsx ← KOMPLETT ERSETZEN!

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSelect() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth") === "true";
    setIsAuthenticated(auth);

    if (!auth) {
      router.replace("/admin?error=login-required");
    }
  }, [router]);

  // Während Prüfung → nichts oder Lade-Text
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-gray-400">Weiterleitung zum Login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-6">
      <div className="bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-12 max-w-4xl w-full">
        <h1 className="text-5xl font-black text-red-500 text-center mb-12 font-display">
          Admin-Bereich
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-5xl w-full text-center px-4">
          <Link
            href="/admin/dashboard"
            className="flex flex-col items-center justify-center min-h-[250px] p-6 bg-gray-900 hover:bg-gray-800 rounded-3xl border-2 border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-500 tracking-tighter break-words hyphens-auto w-full">
              Dashboard
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-gray-600 uppercase tracking-widest">
              Produkte verwalten
            </h2>
          </Link>

          <Link
            href="/admin/orders"
            className="flex flex-col items-center justify-center min-h-[250px] p-6 bg-gray-900 hover:bg-gray-800 rounded-3xl border-2 border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-500 tracking-tighter break-words hyphens-auto w-full">
              Orders
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-gray-600 uppercase tracking-widest">
              Bestellungen verwalten
            </h2>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-white transition text-lg"
          >
            ← Zurück zum Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
