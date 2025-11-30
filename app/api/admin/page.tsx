// app/admin/page.tsx
import AdminPanel from "@/components/AdminPanel";
import AdminAuth from "@/components/AdminAuth";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminPanel />
    </AdminAuth>
  );
}