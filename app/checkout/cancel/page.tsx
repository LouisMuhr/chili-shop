import Link from "next/link";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-black text-red-500 mb-8">Zahlung abgebrochen</h1>
        <Link href="/cart" className="text-xl text-[#e63946]">← Zurück zum Warenkorb</Link>
      </div>
    </div>
  );
}