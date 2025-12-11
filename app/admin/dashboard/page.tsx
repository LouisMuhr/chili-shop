// app/admin/dashboard/page.tsx

import AdminGuard from "@/components/AdminGuard";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminPanel />
    </AdminGuard>
  );
}