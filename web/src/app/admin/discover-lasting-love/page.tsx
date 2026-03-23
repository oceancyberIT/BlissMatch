'use client';

import { HomeComponentCardPage } from '@/components/admin/home-component-card-page';

export default function DiscoverLastingLoveAdminPage() {
  return (
    <HomeComponentCardPage
      sectionKey="servicesOverview"
      layoutTitle="Admin"
      layoutDescription="Manage the Discover Lasting Love section."
      heroTitle="Discover Lasting Love"
      heroSubtitle="View, edit, or reset this homepage component card."
      cardTitle="Discover Lasting Love card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Discover Lasting Love"
      successMessage="Discover Lasting Love saved."
      deleteMessage="Discover Lasting Love reset to defaults."
    />
  );
}
