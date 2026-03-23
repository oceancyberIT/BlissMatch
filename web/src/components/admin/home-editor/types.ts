import React from 'react';

export type SectionKey =
  | 'ourStory'
  | 'servicesOverview'
  | 'loveConnection'
  | 'blissCircle'
  | 'whyChooseUs';

export type HomeContent = {
  ourStory: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    paragraphOne: string;
    quote: string;
    paragraphTwo: string;
    ctaLabel: string;
    ctaHref: string;
    imageUrl: string;
    imageAlt: string;
  };
  servicesOverview: {
    heading: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      ctaLabel: string;
    }>;
  };
  loveConnection: {
    heading: string;
    subtext: string;
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  blissCircle: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    paragraphOne: string;
    paragraphTwo: string;
    badges: Array<{
      label: string;
    }>;
    imageUrl: string;
    imageAlt: string;
    overlayTitle: string;
    overlayCtaLabel: string;
  };
  whyChooseUs: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    paragraphOne: string;
    quote: string;
    paragraphTwo: string;
    valueCards: Array<{
      title: string;
      description: string;
    }>;
  };
};

export type SectionTab = {
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

