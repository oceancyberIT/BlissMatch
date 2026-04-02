import { AboutContent } from './types';

export const INITIAL_ABOUT_CONTENT: AboutContent = {
  hero: {
    title: 'Our Story',
    subtitle: 'Established in Connection',
    body: 'BlissMatch was founded by two best friends—one from a background in Human Behaviour Studies, the other in Business and Law—united by a vision to restore authenticity to modern relationships.',
    sideNote:
      'In a fast, digital world, real connection had become rare. We built BlissMatch as a sanctuary for meaningful love—a private consultancy rooted in discretion and human understanding.',
    backgroundImageUrl: '/image copy 2.png',
    sideImageUrl: '/image.png',
    quote: 'Restoring the art of human connection.',
  },
  philosophy: {
    eyebrow: 'Our Philosophy',
    headingMain: 'We believe that',
    headingAccent: 'love is deliberate.',
    quote:
      'It starts with self-awareness, deepens through shared values, and endures through emotional intelligence.',
    body: 'We combine psychological insight with refined matchmaking practice to help clients connect on every level — intellectual, emotional, and spiritual.',
    imageLeft: '/image.png',
    imageCenter: '/image copy 4.png',
    imageRight: '/image copy 3.png',
    promiseTitle: 'Our Promise',
    promiseText: "We don't introduce many. We introduce meaningfully.",
    trustTitle: 'Discretion & Trust',
    trustText:
      'Every engagement is private and by appointment only.',
    trustSubtext: 'Ensuring professionalism, privacy, and care.',
  },
  discretion: {
    badge: 'Strictly Confidential',
    headingMain: 'Discretion is our',
    headingAccent: 'Foundation.',
    paragraph:
      'Every engagement is private and by appointment only. We handle each relationship with discretion, professionalism, and care.',
    cards: [
      {
        title: 'Invisible Digital Footprint',
        desc: 'We do not maintain public profiles of our clients. Your journey remains private.',
      },
      {
        title: 'By Appointment Only',
        desc: 'We ensure dedicated time and total focus for every single consultation.',
      },
      {
        title: 'Personal Handling',
        desc: 'No automated systems. Only high-level human consultancy.',
      },
      {
        title: 'Legal Protection',
        desc: 'Strict non-disclosure agreements protect all parties involved.',
      },
    ],
  },
  process: {
    eyebrow: 'The Journey',
    heading: 'Our Five-Step Process',
    backgroundImageUrl: '/image.png',
    steps: [
      {
        id: '01',
        title: 'Private Consultation',
        description:
          'Every journey begins with listening. We meet you - in person or virtually - to understand your story, values, and relationship goals.',
      },
      {
        id: '02',
        title: 'Compatibility Design',
        description:
          'We craft a detailed personal profile based on insight, capturing your history, emotional needs, and long-term goals.',
      },
      {
        id: '03',
        title: 'Curated Introductions',
        description:
          'We introduce you only to those who reflect your values and lifestyle. Every introduction is strictly confidential.',
      },
      {
        id: '04',
        title: 'Relationship Coaching',
        description:
          'Personalised coaching helping you approach love with self-awareness, confidence, and emotional clarity.',
      },
      {
        id: '05',
        title: 'Ongoing Support',
        description:
          'Our role continues as you connect - offering insight and quiet guidance as your relationship evolves.',
      },
    ],
  },
  cta: {
    eyebrow: 'Connection Begins with a Conversation',
    headingMain: 'Are you ready for a',
    headingAccent: 'meaningful',
    paragraph:
      'Meaningful relationships are not found in algorithms. They are curated with intention and discretion.',
    buttonLabel: 'Book a Private Consultation',
    buttonHref: '/appointment',
    images: [
      { src: '/image copy 2.png', alt: 'Authentic couple sharing a laugh' },
      { src: '/image copy 4.png', alt: 'A sophisticated couple in a close embrace' },
      { src: '/image copy 3.png', alt: 'Couple walking hand-in-hand in a garden' },
    ],
    locations: ['London', 'Accra', 'Paris'],
  },
};

/** Deep-merge API JSON with defaults so admin always shows DB truth, not bundled placeholders. */
export function mergeAboutContent(
  loaded: Partial<AboutContent> | null | undefined,
): AboutContent {
  if (!loaded || typeof loaded !== 'object') {
    return INITIAL_ABOUT_CONTENT;
  }
  const d = loaded as Partial<AboutContent>;
  return {
    hero: { ...INITIAL_ABOUT_CONTENT.hero, ...(d.hero ?? {}) },
    philosophy: {
      ...INITIAL_ABOUT_CONTENT.philosophy,
      ...(d.philosophy ?? {}),
    },
    discretion: {
      ...INITIAL_ABOUT_CONTENT.discretion,
      ...(d.discretion ?? {}),
      cards:
        Array.isArray(d.discretion?.cards) && d.discretion.cards.length
          ? d.discretion.cards
          : INITIAL_ABOUT_CONTENT.discretion.cards,
    },
    process: {
      ...INITIAL_ABOUT_CONTENT.process,
      ...(d.process ?? {}),
      steps:
        Array.isArray(d.process?.steps) && d.process.steps.length
          ? d.process.steps
          : INITIAL_ABOUT_CONTENT.process.steps,
    },
    cta: {
      ...INITIAL_ABOUT_CONTENT.cta,
      ...(d.cta ?? {}),
      images:
        Array.isArray(d.cta?.images) && d.cta!.images!.length
          ? d.cta!.images!
          : INITIAL_ABOUT_CONTENT.cta.images,
      locations:
        Array.isArray(d.cta?.locations) && d.cta!.locations!.length
          ? d.cta!.locations!
          : INITIAL_ABOUT_CONTENT.cta.locations,
    },
  };
}

