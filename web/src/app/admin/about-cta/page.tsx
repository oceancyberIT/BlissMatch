'use client';

import { AboutComponentCardPage } from '@/components/admin/about-component-card-page';

export default function AboutCtaAdminPage() {
  return (
    <AboutComponentCardPage
      sectionKey="cta"
      layoutTitle="Admin"
      layoutDescription="Manage the About — Call to action section."
      heroTitle="Call To Action"
      heroSubtitle="View, edit, or reset this About page block."
      cardTitle="Call to action card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Call To Action"
      successMessage="Call to action saved."
      deleteMessage="Call to action reset to defaults."
    />
  );
}
