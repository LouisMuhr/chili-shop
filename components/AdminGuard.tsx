"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth") === "true";
    setIsAuthenticated(auth);

    if (!auth) {
      router.replace("/admin");
    }
  }, [router]);

  // Während SSR + während useEffect → noch kein sessionStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-gray-400">Lade…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-gray-400">Zugriff verweigert – bitte einloggen</p>
      </div>
    );
  }

  return <>{children}</>;
}
