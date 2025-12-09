// app/admin/select/page.tsx

import AdminGuard from "@/components/AdminGuard";
import AdminSelect from "@/components/AdminSelect";

export default function AdminSelectPage() {
  return (
    <AdminGuard>
      <AdminSelect />
    </AdminGuard>
  );
}