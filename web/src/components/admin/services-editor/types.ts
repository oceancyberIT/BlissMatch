export type ServicesGridCard = {
  title: string;
  desc: string;
  size: 'lg' | 'sm';
};

export type ServicesContent = {
  grid: {
    cards: ServicesGridCard[];
    banner: {
      eyebrow: string;
      title: string;
      paragraph: string;
    };
  };
  socialImpact: {
    imageUrl: string;
    imageAlt: string;
    overlayQuote: string;
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    paragraphOne: string;
    paragraphTwo: string;
    commitmentTitle: string;
    commitmentText: string;
  };
  confidentiality: {
    title: string;
    subtitle: string;
    imageTopLeft: string;
    imageTopRight: string;
    imageBottomRight: string;
    imageBottomLeft: string;
    bullets: string[];
  };
};

export type ServicesSectionKey = 'grid' | 'socialImpact' | 'confidentiality';
