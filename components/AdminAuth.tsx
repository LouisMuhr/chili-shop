// components/AdminAuth.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CORRECT_PASSWORD = "chili2025"; // ÄNDERE DAS!

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      router.refresh();
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (typeof window !== "undefined" && sessionStorage.getItem("admin-auth") === "true") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-12 rounded-3xl shadow-2xl border border-red-900/50 max-w-md w-full">
        <h1 className="text-4xl font-black text-red-500 text-center mb-8 font-display">Admin-Zugang</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Passwort"
          className="w-full px-6 py-5 bg-gray-800 text-white rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/50"
          autoFocus
        />
        {error && <p className="text-red-400 text-center mt-4 font-bold">Falsches Passwort!</p>}
        <button type="submit" className="w-full mt-8 py-5 bg-red-600 hover:bg-red-500 text-white font-bold text-xl rounded-xl transition">
          Einloggen
        </button>
      </form>
    </div>
  );
}