'use client';

import { ServicesComponentCardPage } from '@/components/admin/services-component-card-page';

export default function ServicesGridCardPage() {
  return (
    <ServicesComponentCardPage
      sectionKey="grid"
      layoutTitle="Admin"
      layoutDescription="Manage the Services — Service grid section."
      heroTitle="Service Grid"
      heroSubtitle="View, edit, or reset this block."
      cardTitle="Service grid card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save service grid"
      successMessage="Service grid saved."
      deleteMessage="Service grid reset to defaults."
    />
  );
}
