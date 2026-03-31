import { ServicesContent } from './types';

export const INITIAL_SERVICES_CONTENT: ServicesContent = {
  hero: {
    gallery: [
      { url: '/image copy 2.png', alt: 'Service detail' },
      { url: '/image copy 3.png', alt: 'Service detail' },
      { url: '/image copy 4.png', alt: 'Service detail' },
    ],
    footerLabel: 'Scroll to Discover',
  },
  grid: {
    cards: [
      {
        title: 'Private Matchmaking',
        desc: 'A bespoke, confidential experience for global citizens seeking lasting love.',
        size: 'lg',
      },
      {
        title: 'Relationship Coaching',
        desc: 'Strengthen communication and resolve emotional barriers.',
        size: 'sm',
      },
      {
        title: 'Image & Confidence',
        desc: 'Radiate authenticity through body language and personal presentation.',
        size: 'sm',
      },
      {
        title: 'Dating Concierge',
        desc: 'Elegant, personalized date experiences designed for comfort and memory.',
        size: 'sm',
      },
    ],
    banner: {
      eyebrow: 'Coming Soon',
      title: 'Retreats & Experiences',
      paragraph: 'Refined spaces for connection, reflection, and discovery.',
    },
  },
  socialImpact: {
    imageUrl: '/image.png',
    imageAlt: 'Community and Connection',
    overlayQuote: 'Helping the world feel less alone.',
    eyebrow: 'Social Impact',
    headingMain: 'Love as a',
    headingAccent: 'Force for Good',
    paragraphOne:
      'At Bliss Match, we believe connection enriches not only lives but communities.',
    paragraphTwo:
      'A portion of our annual proceeds supports mental health and wellbeing initiatives for young adults navigating digital isolation.',
    commitmentTitle: 'Our Commitment',
    commitmentText: 'Every match made contributes to global emotional resilience.',
  },
  confidentiality: {
    title: 'Confidentiality Charter',
    subtitle: 'Discretion is not a courtesy — it is our code',
    imageTopLeft: '/image copy.png',
    imageTopRight: '/image copy.png',
    imageBottomRight: '/image.png',
    imageBottomLeft: '/image.png',
    bullets: [
      'Strict Non-Disclosure Agreements for all data.',
      'Zero client disclosure without explicit consent.',
      'Binding commitments from all partners.',
      'Private, appointment-only consultations.',
      'Highest ethical standards in image safeguarding.',
    ],
  },
};

/** Three staggered cards on the services hero (left → right). */
export function mergeHeroGallery(
  initial: ServicesContent['hero']['gallery'],
  loaded?: Partial<{ url: string; alt: string }>[] | null,
): ServicesContent['hero']['gallery'] {
  return initial.map((slot, i) => ({
    ...slot,
    ...(loaded?.[i] ?? {}),
  }));
}

export function mergeServicesContent(raw: unknown): ServicesContent {
  if (!raw || typeof raw !== 'object') return INITIAL_SERVICES_CONTENT;
  const d = raw as Partial<ServicesContent>;
  return {
    ...INITIAL_SERVICES_CONTENT,
    ...d,
    hero: {
      ...INITIAL_SERVICES_CONTENT.hero,
      ...d.hero,
      gallery: mergeHeroGallery(INITIAL_SERVICES_CONTENT.hero.gallery, d.hero?.gallery),
    },
    grid: {
      ...INITIAL_SERVICES_CONTENT.grid,
      ...d.grid,
      cards:
        Array.isArray(d.grid?.cards) && d.grid!.cards!.length > 0
          ? d.grid!.cards!
          : INITIAL_SERVICES_CONTENT.grid.cards,
      banner: {
        ...INITIAL_SERVICES_CONTENT.grid.banner,
        ...d.grid?.banner,
      },
    },
    socialImpact: {
      ...INITIAL_SERVICES_CONTENT.socialImpact,
      ...d.socialImpact,
    },
    confidentiality: {
      ...INITIAL_SERVICES_CONTENT.confidentiality,
      ...d.confidentiality,
      bullets:
        Array.isArray(d.confidentiality?.bullets) &&
        d.confidentiality!.bullets!.length > 0
          ? d.confidentiality!.bullets!
          : INITIAL_SERVICES_CONTENT.confidentiality.bullets,
    },
  };
}
