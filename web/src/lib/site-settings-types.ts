/** JSON stored per SiteSettings.key in the backend */

export type NavigationContent = {
  items: Array<{ id: string; name: string; href: string }>;
  phoneLabel: string;
  phoneNumber: string;
  phoneHref: string;
};

export type FooterContent = {
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
  brandName: string;
  brandTagline: string;
  navColumnTitle: string;
  links: Array<{ id: string; name: string; href: string }>;
  contactTitle: string;
  locationsLine: string;
  email: string;
  emailHref: string;
  social: Array<{ icon: 'instagram' | 'linkedin' | 'mail'; href: string }>;
  copyright: string;
  legal: Array<{ id: string; name: string; href: string }>;
};

export type AppointmentPageContent = {
  eyebrow: string;
  titleLine1: string;
  titleItalic: string;
  lead: string;
  imageUrl: string;
  imageAlt: string;
  formTitle: string;
  fieldNameLabel: string;
  fieldEmailLabel: string;
  fieldLocationLabel: string;
  fieldInquiryTypeLabel: string;
  inquiryTypeOptions: string[];
  fieldMessageLabel: string;
  submitLabel: string;
  contactLinks: Array<{
    title: string;
    subtitle: string;
    href: string;
    variant: 'whatsapp' | 'phone' | 'email';
  }>;
};

export type ContactPageContent = {
  eyebrow: string;
  titleLine1: string;
  titleItalic: string;
  lead: string;
  quote: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  /** Instagram, LinkedIn, Facebook — icons are fixed by platform */
  socialLinks: Array<{
    platform: 'instagram' | 'linkedin' | 'facebook';
    href: string;
  }>;
  formTitle: string;
  fieldNameLabel: string;
  fieldEmailLabel: string;
  fieldSubjectLabel: string;
  subjectOptions: string[];
  fieldMessageLabel: string;
  submitLabel: string;
};

export type EnquiryRow = {
  id: string;
  fullName: string;
  email: string;
  location: string | null;
  message: string;
  source: string;
  subject: string | null;
  inquiryType: string | null;
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
};
