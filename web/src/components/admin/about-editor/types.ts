export type AboutContent = {
  hero: {
    title: string;
    subtitle: string;
    body: string;
    sideNote: string;
    backgroundImageUrl: string;
    sideImageUrl: string;
    quote: string;
  };
  philosophy: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    quote: string;
    body: string;
    imageLeft: string;
    imageCenter: string;
    imageRight: string;
    promiseTitle: string;
    promiseText: string;
    trustTitle: string;
    trustText: string;
    trustSubtext: string;
  };
  discretion: {
    badge: string;
    headingMain: string;
    headingAccent: string;
    paragraph: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
  };
  process: {
    eyebrow: string;
    heading: string;
    backgroundImageUrl: string;
    steps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    paragraph: string;
    buttonLabel: string;
    buttonHref: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
    locations: string[];
  };
};

