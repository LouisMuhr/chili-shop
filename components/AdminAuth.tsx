// components/AdminAuth.tsx  ← KOMPLETT ERSETZEN!

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CORRECT_PASSWORD = "chili2025"; // ← Dein Passwort hier ändern!

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Prüfen, ob schon eingeloggt (bleibt bis Tab schließen)
  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
      window.location.href = "/admin/select";
      return;
    }
  };

  // SOFORT weiterleiten, wenn authentifiziert → kein Scrollen mehr nötig!
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Nur das Passwort-Fenster anzeigen, wenn noch nicht eingeloggt
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-12 rounded-3xl shadow-2xl border border-red-900/50 max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-black text-red-500 mb-8 font-display">
          Admin-Zugang
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Passwort eingeben"
          className="w-full px-6 py-5 bg-gray-800 text-white rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 transition mb-6"
          autoFocus
        />

        {error && (
          <p className="text-red-400 font-bold mb-6">Falsches Passwort!</p>
        )}

        <button
          type="submit"
          className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-bold text-xl rounded-xl transition shadow-xl"
        >
          Einloggen
        </button>
      </form>
    </div>
  );
}
