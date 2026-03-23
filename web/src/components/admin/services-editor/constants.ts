import { ServicesContent } from './types';

export const INITIAL_SERVICES_CONTENT: ServicesContent = {
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
