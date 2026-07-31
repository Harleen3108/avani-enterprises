/**
 * contactServices.ts — the service picker on /contact.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The contact form offered ten options ("Web & App Development", "AI Solutions",
 * "Other"…) against the 39 services in SERVICES (src/data/serviceContent.js).
 * Someone looking for a Shopify build, a voice agent or an HRMS could not say
 * so, and picked "Other" or left. A lead that arrives as "Other" needs a call
 * just to find out what it is.
 *
 * Every canonical service appears here exactly once, grouped the way buyers
 * actually think about them rather than the way the URL structure is organised.
 * Group labels are ours; the leaf labels match SERVICES[].name so the value that
 * reaches the CRM is the same string used everywhere else on the site.
 *
 * WHEN YOU ADD A SERVICE
 * ----------------------
 * Add it to SERVICES first, then add the same `name` here. `npm run verify:seo`
 * fails if the two lists drift, so this cannot silently fall behind again.
 */

export interface ServiceGroup {
  /** Shown as the chip-group heading. */
  label: string;
  /** Leaf labels — must match SERVICES[].name in serviceContent.js. */
  items: string[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: 'Websites & apps',
    items: [
      'Web Development',
      'Web Design',
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'Mobile App Development',
      'Android App Development',
      'iOS App Development',
      'Flutter App Development',
      'React Native Development',
    ],
  },
  {
    label: 'E-commerce',
    items: [
      'E-commerce Development',
      'Shopify Development',
      'WooCommerce Development',
      'E-commerce SEO',
    ],
  },
  {
    label: 'Search & advertising',
    items: [
      'SEO Services',
      'Local SEO',
      'Enterprise SEO',
      'Digital Marketing',
      'Google Ads Management',
      'Meta Ads Management',
      'Social Media Marketing',
      'Instagram Marketing',
    ],
  },
  {
    label: 'AI',
    items: [
      'AI Development',
      'AI Chatbot Development',
      'AI Voice Callers',
      'Agentic AI Development',
      'AI & Business Process Automation',
      'AI Content Services',
      'AI Video Services',
      'AI Consulting',
    ],
  },
  {
    label: 'Business software',
    items: [
      'CRM Development',
      'CRM Consulting',
      'ERP Development',
      'Custom Software Development',
    ],
  },
  {
    label: 'Other services',
    items: [
      'Podcast Production',
      'Business Consultation',
      'Financial Consulting',
      'Business Loans',
      'Business Insurance',
    ],
  },
];

/** Flat list, for validation and for the "not sure yet" escape hatch. */
export const ALL_SERVICES: string[] = SERVICE_GROUPS.flatMap((g) => g.items);

/**
 * Offered as a chip rather than a free-text "Other" box.
 *
 * "Other" forced a second field to appear and produced leads nobody could
 * route. Someone who does not know what they need is a real and common case —
 * it just needs a call, not a text box.
 */
export const NOT_SURE = 'Not sure yet — help me scope it';
