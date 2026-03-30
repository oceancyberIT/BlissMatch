import type {
  AppointmentPageContent,
  ContactPageContent,
  FooterContent,
  NavigationContent,
} from './site-settings-types';

export const INITIAL_NAVIGATION: NavigationContent = {
  items: [
    { id: '1', name: 'Home', href: '/' },
    { id: '2', name: 'About', href: '/about' },
    { id: '3', name: 'Services', href: '/services' },
    { id: '4', name: 'Contact', href: '/contact' },
    { id: '5', name: 'Appointment', href: '/appointment' },
  ],
  phoneLabel: 'Book an Appointment',
  phoneNumber: '+44 888 123 4587',
  phoneHref: 'tel:+448881234587',
};

export const INITIAL_FOOTER: FooterContent = {
  ctaEyebrow: 'Inquiry',
  ctaTitle: 'Ready for a meaningful introduction?',
  ctaButtonLabel: 'Book',
  ctaButtonHref: '/appointment',
  brandName: 'BlissMatch',
  brandTagline:
    'Private matchmaking consultancy for exceptional individuals. Worldwide.',
  navColumnTitle: 'Navigation',
  links: [
    { id: 'f-1', name: 'About', href: '/about' },
    { id: 'f-2', name: 'Services', href: '/services' },
    { id: 'f-3', name: 'Contact', href: '/contact' },
    { id: 'f-4', name: 'Appointment', href: '/appointment' },
  ],
  contactTitle: 'Contact',
  locationsLine: 'London • Accra',
  email: 'hello@blissmatch.com',
  emailHref: 'mailto:hello@blissmatch.com',
  social: [
    { icon: 'instagram', href: '#' },
    { icon: 'linkedin', href: '#' },
    { icon: 'mail', href: 'mailto:hello@blissmatch.com' },
  ],
  copyright: 'BlissMatch Registry.',
  legal: [
    { id: 'l-1', name: 'Privacy', href: '/privacy' },
    { id: 'l-2', name: 'Terms', href: '/terms' },
  ],
};

export const INITIAL_APPOINTMENT: AppointmentPageContent = {
  eyebrow: 'Begin Your Journey',
  titleLine1: "Let's",
  titleItalic: 'Connect',
  lead: 'Our advisors are here to listen with absolute discretion.',
  imageUrl: '/image.png',
  imageAlt: 'A couple',
  formTitle: 'Private Request Form',
  fieldNameLabel: 'Full Name',
  fieldEmailLabel: 'Email Address',
  fieldLocationLabel: 'Your Location',
  fieldInquiryTypeLabel: 'Inquiry Type',
  inquiryTypeOptions: ['Private Matchmaking', 'Relationship Coaching', 'Other'],
  fieldMessageLabel: 'Your Message',
  submitLabel: 'Send Private Request',
  contactLinks: [
    { title: 'WhatsApp', subtitle: '+44 700 000', href: '#', variant: 'whatsapp' },
    { title: 'Callback', subtitle: 'Request Call', href: '#', variant: 'phone' },
    { title: 'Email', subtitle: 'enquiries@bliss', href: '#', variant: 'email' },
  ],
};

export const INITIAL_CONTACT: ContactPageContent = {
  eyebrow: 'Contact',
  titleLine1: 'Begin Your',
  titleItalic: 'Journey',
  lead: 'Every great love story begins with a conversation.',
  quote:
    'Schedule a confidential consultation in London or arrange a virtual session from anywhere in the world.',
  address: 'London, United Kingdom',
  phone: '+44 (0) 7000 000 000',
  phoneHref: 'tel:+447000000000',
  email: 'enquiries@blissmatch.com',
  emailHref: 'mailto:enquiries@blissmatch.com',
  socialLinks: [
    { platform: 'instagram', href: '#' },
    { platform: 'linkedin', href: '#' },
    { platform: 'facebook', href: '#' },
  ],
  formTitle: 'Confidential Inquiry',
  fieldNameLabel: 'Your Name',
  fieldEmailLabel: 'Email',
  fieldSubjectLabel: 'Subject',
  subjectOptions: ['Private Matchmaking', 'Relationship Coaching', 'Other'],
  fieldMessageLabel: 'Message',
  submitLabel: 'Send Transmission',
};
