'use client';

import { HomeComponentCardPage } from '@/components/admin/home-component-card-page';

export default function BecauseLoveDeservesCraftAdminPage() {
  return (
    <HomeComponentCardPage
      sectionKey="whyChooseUs"
      layoutTitle="Admin"
      layoutDescription="Manage the Because Love Deserves Craft section."
      heroTitle="Because Love Deserves Craft"
      heroSubtitle="View, edit, or reset this homepage component card."
      cardTitle="Because Love Deserves Craft card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Because Love Deserves Craft"
      successMessage="Because Love Deserves Craft saved."
      deleteMessage="Because Love Deserves Craft reset to defaults."
    />
  );
}
