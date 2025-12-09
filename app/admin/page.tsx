// app/admin/page.tsx
import AdminAuth from "@/components/AdminAuth";
import AdminSelect from "@/components/AdminSelect";

export default function AdminLogin() {
  return (
    <AdminAuth>
      <AdminSelect />
    </AdminAuth>
  );
}