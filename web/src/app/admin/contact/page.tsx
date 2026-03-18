'use client';

import AdminLayout from '@/components/admin/admin-layout';

export default function AdminContactPage() {
  return (
    <AdminLayout
      title="Contact Page"
      description="Review and refine how enquiries reach the Bliss Match team."
    >
      <div className="space-y-4">
        <p className="text-sm text-stone-600">
          This view will become your console for contact form enquiries: triaging
          messages, updating status, and adjusting the public-facing contact details.
        </p>
        <p className="text-xs text-stone-400">
          Coming next: enquiry list, status filters, and CRM export.
        </p>
      </div>
    </AdminLayout>
  );
}

