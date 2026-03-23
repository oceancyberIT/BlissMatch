'use client';

import { ServicesComponentCardPage } from '@/components/admin/services-component-card-page';

export default function ServicesConfidentialityCardPage() {
  return (
    <ServicesComponentCardPage
      sectionKey="confidentiality"
      layoutTitle="Admin"
      layoutDescription="Manage the Services — Confidentiality charter section."
      heroTitle="Confidentiality"
      heroSubtitle="View, edit, or reset this block."
      cardTitle="Confidentiality card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save confidentiality"
      successMessage="Confidentiality section saved."
      deleteMessage="Confidentiality section reset to defaults."
    />
  );
}
