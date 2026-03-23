'use client';

import { HomeComponentCardPage } from '@/components/admin/home-component-card-page';

export default function BlissCircleAdminPage() {
  return (
    <HomeComponentCardPage
      sectionKey="blissCircle"
      layoutTitle="Admin"
      layoutDescription="Manage the Bliss Circle section."
      heroTitle="Bliss Circle"
      heroSubtitle="View, edit, or reset this homepage component card."
      cardTitle="Bliss Circle card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Bliss Circle"
      successMessage="Bliss Circle saved."
      deleteMessage="Bliss Circle reset to defaults."
    />
  );
}
