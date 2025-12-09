// components/AdminGuard.tsx ← neu anlegen!

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin-auth") === "true";

    if (!isAuthenticated) {
      router.replace("/admin"); // zurück zum Login
    }
  }, [router]);

  const isAuthenticated = sessionStorage.getItem("admin-auth") === "true";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-gray-400">Zugriff verweigert – bitte einloggen</p>
      </div>
    );
  }

  return <>{children}</>;
}