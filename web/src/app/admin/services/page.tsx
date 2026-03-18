'use client';

import AdminLayout from '@/components/admin/admin-layout';

export default function AdminServicesPage() {
  return (
    <AdminLayout
      title="Services Page"
      description="Curate and refine the services offered to clients."
    >
      <div className="space-y-4">
        <p className="text-sm text-stone-600">
          Here you’ll be able to manage service cards, descriptions, and supporting
          content shown on the public Services page.
        </p>
        <p className="text-xs text-stone-400">
          Coming next: add, reorder, and archive services, plus control pricing copy.
        </p>
      </div>
    </AdminLayout>
  );
}

