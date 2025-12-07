// app/admin/select/page.tsx
import Link from "next/link";

export default function AdminSelect() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-6">
      <div className="bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-12 max-w-4xl w-full">
        <h1 className="text-5xl font-black text-red-500 text-center mb-12 font-display">
          Admin-Bereich
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <Link
            href="/admin/dashboard"
            className="p-12 bg-gray-900 hover:bg-gray-800 rounded-2xl border-2 border-gray-700 hover:border-red-600 transition-all duration-300 text-center transform hover:scale-105 shadow-2xl"
          >
            <div className="text-7xl mb-4">ChartLine</div>
            <h2 className="text-3xl font-bold text-white mb-3">Dashboard</h2>
            <p className="text-gray-400">Produkte verwalten</p>
          </Link>

          <div className="p-12 bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-700 text-center opacity-60">
            <div className="text-7xl mb-4 text-gray-600">Settings</div>
            <h2 className="text-3xl font-bold text-gray-600 mb-3">In Entwicklung</h2>
            <p className="text-gray-600">Bald verfügbar…</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition text-lg">
            ← Zurück zum Shop
          </Link>
        </div>
      </div>
    </div>
  );
}