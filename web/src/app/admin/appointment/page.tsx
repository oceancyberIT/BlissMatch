'use client';

import AdminLayout from '@/components/admin/admin-layout';

export default function AdminAppointmentPage() {
  return (
    <AdminLayout
      title="Appointment Page"
      description="Oversee how prospective clients book private consultations."
    >
      <div className="space-y-4">
        <p className="text-sm text-stone-600">
          This section will surface appointment form submissions and allow you to tune
          the questions, messaging, and routing for new consultation requests.
        </p>
        <p className="text-xs text-stone-400">
          Coming next: integrated appointment inbox and calendar linking.
        </p>
      </div>
    </AdminLayout>
  );
}

