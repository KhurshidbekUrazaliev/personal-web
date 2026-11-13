/**
 * Facts that several components repeat: who I am, where the site lives and
 * how to reach me. Change them here and every section follows.
 */
const role = 'Software Engineer';
// Spelled the way the company writes it on its own site.
const company = 'Jinie EduTech';

export const EDUCATION = {
  field: 'Computer Engineering (AI)',
  degree: "Bachelor's in Computer Engineering (AI Department)",
  school: 'Youngsan University',
  schoolShort: 'YSU',
  place: 'Busan, South Korea',
  period: 'Expected 2028',
} as const;

export const SITE = {
  name: 'Khurshidbek Urazaliev',
  url: 'https://www.khurshidbek.site',
  domain: 'khurshidbek.site',
  role,
  company,
  // http on purpose: the company site has no valid https certificate yet,
  // so an https link would open on a browser warning.
  companyUrl: 'http://jcodeedu.com',
  location: 'Busan, South Korea',
  // The short line under my name, also used when the link is shared.
  tagline: `${role} at ${company} and ${EDUCATION.field} student at ${EDUCATION.schoolShort}.`,
  // The longer line for search engines spells the university out.
  description: `${role} at ${company} and ${EDUCATION.field} student at ${EDUCATION.school} (${EDUCATION.schoolShort}) in Busan, South Korea. I build web apps, mobile apps and AI tools with React, Next.js and Python.`,
} as const;

export const EMAILS = {
  primary: 'ummahfaris@gmail.com',
  secondary: 'khurshidbekurazaliev@gmail.com',
} as const;

export const LINKS = {
  github: 'https://github.com/KhurshidbekUrazaliev',
  linkedin: 'https://www.linkedin.com/in/khurshidbekurazaliev',
  instagram: 'https://www.instagram.com/cfarisc19/',
  telegram: 'https://t.me/lu3frv',
  frontendHub: 'https://frontendhub.site',
} as const;

/** A `mailto:` address that reaches both inboxes. */
export const MAILTO_BOTH = `mailto:${EMAILS.primary},${EMAILS.secondary}`;

/**
 * Access key for the contact form, from https://web3forms.com.
 * Web3Forms keys are made to sit in public page code, so it can live here.
 * While this is empty the form opens the visitor's mail app instead.
 */
export const WEB3FORMS_ACCESS_KEY = '35a6201d-3163-43d5-8319-0773f7a93466';
