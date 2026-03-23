import AdminLayout from "@/components/admin/admin-layout";
import { AdminHeroManager } from "@/components/admin/hero-manager";

export default function AdminHeroPage() {
  return (
    <AdminLayout title="Hero Sections">
      <AdminHeroManager />
    </AdminLayout>
  );
}

