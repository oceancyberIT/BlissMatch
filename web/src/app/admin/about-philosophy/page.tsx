'use client';

import { AboutComponentCardPage } from '@/components/admin/about-component-card-page';

export default function AboutPhilosophyAdminPage() {
  return (
    <AboutComponentCardPage
      sectionKey="philosophy"
      layoutTitle="Admin"
      layoutDescription="Manage the About — Philosophy section."
      heroTitle="Philosophy"
      heroSubtitle="View, edit, or reset this About page block."
      cardTitle="Philosophy card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Philosophy"
      successMessage="Philosophy saved."
      deleteMessage="Philosophy reset to defaults."
    />
  );
}
