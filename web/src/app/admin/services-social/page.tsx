'use client';

import { ServicesComponentCardPage } from '@/components/admin/services-component-card-page';

export default function ServicesSocialCardPage() {
  return (
    <ServicesComponentCardPage
      sectionKey="socialImpact"
      layoutTitle="Admin"
      layoutDescription="Manage the Services — Social impact section."
      heroTitle="Social Impact"
      heroSubtitle="View, edit, or reset this block."
      cardTitle="Social impact card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save social impact"
      successMessage="Social impact saved."
      deleteMessage="Social impact reset to defaults."
    />
  );
}
