'use client';

import { ServicesComponentCardPage } from '@/components/admin/services-component-card-page';

export default function ServicesHeroCardPage() {
  return (
    <ServicesComponentCardPage
      sectionKey="hero"
      layoutTitle="Admin"
      layoutDescription="Services page hero — gallery images and footer line (copy + background in Hero)."
      heroTitle="Hero gallery"
      heroSubtitle="Same JSON as Services → Hero gallery tab. Saves to /api/admin/services."
      cardTitle="Hero gallery"
      cardHint="Three staggered images + footer."
      saveLabel="Save hero gallery"
      successMessage="Hero gallery saved."
      deleteMessage="Hero gallery reset to defaults."
    />
  );
}
