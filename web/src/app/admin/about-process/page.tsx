'use client';

import { AboutComponentCardPage } from '@/components/admin/about-component-card-page';

export default function AboutProcessAdminPage() {
  return (
    <AboutComponentCardPage
      sectionKey="process"
      layoutTitle="Admin"
      layoutDescription="Manage the About — Process section."
      heroTitle="Process"
      heroSubtitle="View, edit, or reset this About page block."
      cardTitle="Process card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Process"
      successMessage="Process saved."
      deleteMessage="Process reset to defaults."
    />
  );
}
