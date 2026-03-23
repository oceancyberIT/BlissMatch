'use client';

import { AboutComponentCardPage } from '@/components/admin/about-component-card-page';

export default function AboutDiscretionAdminPage() {
  return (
    <AboutComponentCardPage
      sectionKey="discretion"
      layoutTitle="Admin"
      layoutDescription="Manage the About — Discretion section."
      heroTitle="Discretion"
      heroSubtitle="View, edit, or reset this About page block."
      cardTitle="Discretion card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Discretion"
      successMessage="Discretion saved."
      deleteMessage="Discretion reset to defaults."
    />
  );
}
