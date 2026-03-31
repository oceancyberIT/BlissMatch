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
    /** Right column — top stacked image (homepage layout) */
    sideImage1Url: string;
    sideImage1Alt: string;
    /** Right column — bottom stacked image */
    sideImage2Url: string;
    sideImage2Alt: string;
  };
  servicesOverview: {
    /** Used by the service cards grid (ServiceQuestions section) */
    heading: string;
    /** Homepage “Our Service” block — left column */
    introEyebrow: string;
    introLead: string;
    introCtaLabel: string;
    introCtaHref: string;
    /** Six fixed slots — order matches the bento collage on the homepage */
    collageImages: Array<{
      url: string;
      alt: string;
      /** Optional CSS object-position, e.g. `center 35%` */
      objectPosition?: string;
    }>;
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
    /** Large image (right column, overlay) */
    imageUrl: string;
    imageAlt: string;
    /** Smaller image (left column, below text card) */
    secondaryImageUrl: string;
    secondaryImageAlt: string;
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

