// app/admin/dashboard/page.tsx

import AdminGuard from "@/components/AdminGuard";
import AdminPanel from "@/components/AdminPanel";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminPanel />
    </AdminGuard>
  );
}