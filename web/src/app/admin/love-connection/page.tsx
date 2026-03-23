'use client';

import { HomeComponentCardPage } from '@/components/admin/home-component-card-page';

export default function LoveConnectionAdminPage() {
  return (
    <HomeComponentCardPage
      sectionKey="loveConnection"
      layoutTitle="Admin"
      layoutDescription="Manage the Love & Connection section."
      heroTitle="Love & Connection"
      heroSubtitle="View, edit, or reset this homepage component card."
      cardTitle="Love & Connection card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Love & Connection"
      successMessage="Love & Connection saved."
      deleteMessage="Love & Connection reset to defaults."
    />
  );
}
