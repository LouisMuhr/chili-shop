// app/admin/select/page.tsx

import AdminGuard from "@/components/AdminGuard";
import AdminSelect from "@/components/SelectPage";

export default function AdminSelectPage() {
  return (
    <AdminGuard>
      <AdminSelect />
    </AdminGuard>
  );
}