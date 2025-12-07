import AdminPanel from "@/components/AdminPanel";
import AdminAuth from "@/components/AdminAuth";
import PageLayout from "@/components/PageLayout";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <PageLayout>
      <AdminAuth>
        <AdminPanel />
      </AdminAuth>
    </PageLayout>
  );
}