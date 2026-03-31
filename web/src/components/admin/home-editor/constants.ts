import { BookOpen, Briefcase, Heart, Sparkles, Star } from 'lucide-react';
import { HomeContent, SectionTab } from './types';

export const SECTION_TABS: Array<SectionTab> = [
  { key: 'ourStory', label: 'Our Story', icon: BookOpen },
  { key: 'servicesOverview', label: 'Discover Lasting Love', icon: Briefcase },
  { key: 'loveConnection', label: 'Love & Connection', icon: Heart },
  { key: 'blissCircle', label: 'Bliss Circle', icon: Sparkles },
  { key: 'whyChooseUs', label: 'Because Love Deserves Craft', icon: Star },
];

export const INITIAL_CONTENT: HomeContent = {
  ourStory: {
    eyebrow: 'Our Story',
    headingMain: 'Restoring authenticity to',
    headingAccent: 'modern connection.',
    paragraphOne:
      'BlissMatch was founded by two lifelong friends, uniting backgrounds in Human Behaviour and Business Law to create a sanctuary for meaningful love in a digital world.',
    quote: 'We don’t introduce many. We introduce meaningfully.',
    paragraphTwo:
      'Our philosophy is simple: Love is deliberate. We combine psychological insight with refined matchmaking to help you connect on every level-intellectual, emotional, and spiritual.',
    ctaLabel: 'Discover Our Full Philosophy',
    ctaHref: '/about',
    imageUrl: '/about.jpg',
    imageAlt: 'BlissMatch Founders',
    sideImage1Url: '/image copy 2.png',
    sideImage1Alt: 'Couple sharing a joyful moment',
    sideImage2Url: '/image copy 6.png',
    sideImage2Alt: 'Couple walking together',
  },
  servicesOverview: {
    heading: 'Elevated Relational Support',
    introEyebrow: 'Our Service',
    introLead:
      'We offer a bespoke, confidential matchmaking experience for discerning professionals and global citizens seeking lasting love.',
    introCtaLabel: 'Our Services',
    introCtaHref: '/services',
    collageImages: [
      {
        url: '/image copy 2.png',
        alt: 'Couple sharing a warm, genuine moment together',
        objectPosition: 'center 35%',
      },
      { url: '/image copy 6.png', alt: 'Couple walking together outdoors' },
      { url: '/image copy 3.png', alt: 'Couple in a quiet, intimate moment' },
      { url: '/image copy.png', alt: 'Couple in a natural, open setting' },
      { url: '/image copy 4.png', alt: 'Couple enjoying time together' },
      {
        url: '/image copy 7.png',
        alt: 'Thoughtful connection and conversation',
      },
    ],
    cards: [
      {
        id: '01.',
        title: 'Private Matchmaking',
        description:
          'A bespoke, confidential matchmaking experience for discerning professionals and global citizens seeking lasting love.',
        ctaLabel: "Let's Talk",
      },
      {
        id: '02.',
        title: 'Relationship Coaching',
        description:
          'Personal coaching sessions to help you strengthen communication, resolve emotional barriers, and deepen relational understanding.',
        ctaLabel: "Let's Talk",
      },
      {
        id: '03.',
        title: 'Image & Confidence',
        description:
          'Coaching on personal presentation and body language - helping you radiate confidence and sincerity.',
        ctaLabel: "Let's Talk",
      },
      {
        id: '04.',
        title: 'Dating Concierge',
        description:
          'We design and coordinate elegant, personalised date experiences ensuring each meeting is thoughtful and memorable.',
        ctaLabel: "Let's Talk",
      },
    ],
  },
  loveConnection: {
    heading: 'Discover Lasting Love & Connection',
    subtext:
      'Investing in learning about relationships is the key to unlocking enduring love and meaningful connections.',
    images: [
      { url: '/image copy.png', alt: 'Couple in field' },
      { url: '/image copy 2.png', alt: 'Couple embracing' },
      { url: '/image copy 3.png', alt: 'Couple whispering' },
    ],
  },
  blissCircle: {
    eyebrow: 'Launching 2026',
    headingMain: 'The',
    headingAccent: 'Bliss Circle',
    paragraphOne:
      'An invitation-only network for returning clients and selected individuals who value meaningful connections, private retreats, and curated gatherings.',
    paragraphTwo:
      'A global community built around sincerity, trust, and emotional growth.',
    badges: [{ label: 'Trust' }, { label: 'Retreats' }, { label: 'Network' }],
    imageUrl: '/image copy 7.png',
    imageAlt: 'Exclusive Gathering',
    secondaryImageUrl: '/image copy 6.png',
    secondaryImageAlt: 'Curated private gatherings',
    overlayTitle: 'Coming Soon',
    overlayCtaLabel: 'Register Interest',
  },
  whyChooseUs: {
    eyebrow: 'The BlissMatch Distinction',
    headingMain: 'Because love',
    headingAccent: 'deserves craft.',
    paragraphOne:
      'At BlissMatch, we bring together relationship counseling, human psychology, emotional intelligence, and culture. We listen deeply before we introduce. We see the human beyond the profile.',
    quote: 'We are not an app. We are an ally.',
    paragraphTwo:
      'Our clients choose us because they value substance over speed, privacy over publicity, and timeless connection over fleeting encounters. We believe that real love is not rare. It is just rarely done right.',
    valueCards: [
      { title: 'Confidentiality', description: 'Absolute discretion in every interaction.' },
      { title: 'Psychology', description: 'Rooted in human behavior studies.' },
      { title: 'Substance', description: 'Depth over digital algorithms.' },
      { title: 'Craft', description: 'Bespoke matchmaking at its finest.' },
    ],
  },
};

/** Ensures six collage slots with defaults when saved JSON is older or partial. */
export function mergeCollageImages(
  initial: HomeContent['servicesOverview']['collageImages'],
  loaded?: HomeContent['servicesOverview']['collageImages'] | null,
): HomeContent['servicesOverview']['collageImages'] {
  return initial.map((slot, i) => ({
    ...slot,
    ...(loaded?.[i] ?? {}),
  }));
}

/** Merges saved JSON with defaults so new fields (e.g. ourStory side images) never come through as undefined. */
export function mergeHomeContent(
  loaded: Partial<HomeContent> | null | undefined,
): HomeContent {
  if (!loaded || typeof loaded !== 'object') return INITIAL_CONTENT;
  const so: Partial<HomeContent['servicesOverview']> =
    loaded.servicesOverview ?? {};
  return {
    ...INITIAL_CONTENT,
    ...loaded,
    ourStory: {
      ...INITIAL_CONTENT.ourStory,
      ...(loaded.ourStory ?? {}),
    },
    servicesOverview: {
      ...INITIAL_CONTENT.servicesOverview,
      ...so,
      cards: so.cards?.length
        ? so.cards
        : INITIAL_CONTENT.servicesOverview.cards,
      collageImages: mergeCollageImages(
        INITIAL_CONTENT.servicesOverview.collageImages,
        so.collageImages,
      ),
    },
    blissCircle: {
      ...INITIAL_CONTENT.blissCircle,
      ...(loaded.blissCircle ?? {}),
    },
  };
}
