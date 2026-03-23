import type {
  AppointmentPageContent,
  ContactPageContent,
  FooterContent,
  NavigationContent,
} from './site-settings-types';
import {
  INITIAL_APPOINTMENT,
  INITIAL_CONTACT,
  INITIAL_FOOTER,
  INITIAL_NAVIGATION,
} from './site-settings-defaults';

export function mergeNavigation(raw: unknown): NavigationContent {
  if (!raw || typeof raw !== 'object') return INITIAL_NAVIGATION;
  const d = raw as Partial<NavigationContent>;
  return {
    ...INITIAL_NAVIGATION,
    ...d,
    items: Array.isArray(d.items) && d.items.length ? d.items : INITIAL_NAVIGATION.items,
  };
}

export function mergeFooter(raw: unknown): FooterContent {
  if (!raw || typeof raw !== 'object') return INITIAL_FOOTER;
  const d = raw as Partial<FooterContent>;
  const links =
    Array.isArray(d.links) && d.links.length
      ? d.links.map((item, idx) => ({
          id: (item as any).id ?? `f-${idx + 1}`,
          name: item.name,
          href: item.href,
        }))
      : INITIAL_FOOTER.links;
  const legal =
    Array.isArray(d.legal) && d.legal.length
      ? d.legal.map((item, idx) => ({
          id: (item as any).id ?? `l-${idx + 1}`,
          name: item.name,
          href: item.href,
        }))
      : INITIAL_FOOTER.legal;
  return {
    ...INITIAL_FOOTER,
    ...d,
    links,
    social: Array.isArray(d.social) && d.social.length ? d.social : INITIAL_FOOTER.social,
    legal,
  };
}

export function mergeAppointment(raw: unknown): AppointmentPageContent {
  if (!raw || typeof raw !== 'object') return INITIAL_APPOINTMENT;
  const d = raw as Partial<AppointmentPageContent>;
  return {
    ...INITIAL_APPOINTMENT,
    ...d,
    inquiryTypeOptions:
      Array.isArray(d.inquiryTypeOptions) && d.inquiryTypeOptions.length
        ? d.inquiryTypeOptions
        : INITIAL_APPOINTMENT.inquiryTypeOptions,
    contactLinks:
      Array.isArray(d.contactLinks) && d.contactLinks.length
        ? d.contactLinks
        : INITIAL_APPOINTMENT.contactLinks,
  };
}

export function mergeContact(raw: unknown): ContactPageContent {
  if (!raw || typeof raw !== 'object') return INITIAL_CONTACT;
  const d = raw as Partial<ContactPageContent>;
  return {
    ...INITIAL_CONTACT,
    ...d,
    subjectOptions:
      Array.isArray(d.subjectOptions) && d.subjectOptions.length
        ? d.subjectOptions
        : INITIAL_CONTACT.subjectOptions,
    socialLinks:
      Array.isArray(d.socialLinks) && d.socialLinks.length
        ? d.socialLinks
        : INITIAL_CONTACT.socialLinks,
  };
}
