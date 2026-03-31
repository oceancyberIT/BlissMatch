'use client';

import { HomeComponentCardPage } from '@/components/admin/home-component-card-page';

export default function DiscoverLastingLoveAdminPage() {
  return (
    <HomeComponentCardPage
      sectionKey="servicesOverview"
      layoutTitle="Admin"
      layoutDescription="Homepage: Our Service intro, image collage, and the service grid heading & cards."
      heroTitle="Discover Lasting Love"
      heroSubtitle="Same content as Homepage → Discover Lasting Love tab. Saves to the live home page."
      cardTitle="Discover Lasting Love card"
      cardHint="Open this card to view or edit details in a popup form."
      saveLabel="Save Discover Lasting Love"
      successMessage="Discover Lasting Love saved."
      deleteMessage="Discover Lasting Love reset to defaults."
    />
  );
}
