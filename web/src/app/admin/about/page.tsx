'use client';

import AdminLayout from '@/components/admin/admin-layout';

export default function AdminAboutPage() {
  return (
    <AdminLayout
      title="About Page"
      description="Edit the story, philosophy, and process behind Bliss Match."
    >
      <div className="space-y-4">
        <p className="text-sm text-stone-600">
          This area will let you manage the copy, imagery, and structure of the public
          About page so it always reflects the tone and positioning of Bliss Match.
        </p>
        <p className="text-xs text-stone-400">
          Coming next: rich-text editing, preview, and version history.
        </p>
      </div>
    </AdminLayout>
  );
}

