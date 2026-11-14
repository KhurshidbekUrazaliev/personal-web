import type { CSSProperties } from 'react';
import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import { GlassLink } from '@/components/links/glass-link';
import { ShareButton } from '@/components/links/share-button';
import {
  AiHaebaIcon,
  FrontendHubIcon,
  GitHubIcon,
  GmailIcon,
  IlmulHaqIcon,
  InstagramIcon,
  LifePathIcon,
  LinkedInIcon,
  TelegramIcon,
  WebsiteIcon,
} from '@/components/links/link-icons';
import { EMAILS, LINKS, MAILTO_BOTH, SITE } from '@/lib/site';

const pageTitle = `${SITE.name} — Links`;
const pageDescription = `Every link for ${SITE.name} in one place: projects, profiles and contact.`;
// The site's share picture. It has to be named again here: a page that sets
// its own share title and address no longer gets the picture by itself.
const shareImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${SITE.name}, ${SITE.role} at ${SITE.company}`,
};

export const metadata: Metadata = {
  title: 'Links',
  description: pageDescription,
  alternates: { canonical: '/links' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/links',
    title: pageTitle,
    description: pageDescription,
    siteName: SITE.name,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [shareImage],
  },
};

// Tints the phone browser's bars like the top of the wallpaper.
export const viewport: Viewport = { themeColor: '#0B2416' };

// The same eleven links, in the same order, as on linktr.ee/ummahfaris.
const links = [
  { title: 'My website', detail: SITE.domain, href: '/', icon: <WebsiteIcon /> },
  { title: 'Frontend Hub', detail: 'References that run', href: LINKS.frontendHub, icon: <FrontendHubIcon /> },
  { title: 'AI 해바', detail: 'AI tools for small businesses', href: LINKS.aiHaeba, icon: <AiHaebaIcon /> },
  { title: 'IlmulHaq', detail: 'Islamic Q&A bot on Telegram', href: LINKS.ilmulHaqBot, icon: <IlmulHaqIcon /> },
  { title: 'LifePath', detail: 'Goals and habits in Telegram', href: LINKS.lifePathBot, icon: <LifePathIcon /> },
  { title: "Xurshidbek's Diary", detail: 'Telegram channel', href: LINKS.telegramChannel, icon: <TelegramIcon /> },
  { title: 'LinkedIn', detail: 'khurshidbekurazaliev', href: LINKS.linkedin, icon: <LinkedInIcon /> },
  { title: 'GitHub', detail: 'KhurshidbekUrazaliev', href: LINKS.github, icon: <GitHubIcon /> },
  { title: 'Instagram', detail: '@cfarisc19', href: LINKS.instagram, icon: <InstagramIcon /> },
  { title: 'Message me on Telegram', detail: '@lu3frv', href: LINKS.telegram, icon: <TelegramIcon /> },
  { title: 'Email me', detail: EMAILS.primary, href: MAILTO_BOTH, icon: <GmailIcon /> },
];

// Glowing balls behind the glass. Sizes and places are parts of the column's
// width and the screen's height; dx and dy are how far each one drifts.
const orbs = [
  { tone: 'gold', size: '44%', top: '4%', left: '70%', blur: 9, time: 27, dx: -16, dy: 22 },
  { tone: 'emerald', size: '60%', top: '33%', left: '-30%', blur: 14, time: 32, dx: 20, dy: -18 },
  { tone: 'rose', size: '16%', top: '47%', left: '86%', blur: 5, time: 22, dx: -12, dy: -20 },
  { tone: 'teal', size: '52%', top: '68%', left: '62%', blur: 12, time: 29, dx: -18, dy: -14 },
  { tone: 'gold', size: '13%', top: '84%', left: '5%', blur: 4, time: 21, dx: 12, dy: -16 },
];

/** Its turn in the entrance: the photo first, the last link last. */
const turn = (i: number) => ({ '--i': i }) as CSSProperties;

export default function LinksPage() {
  return (
    <div className="links-page">
      <div className="links-wallpaper" aria-hidden="true">
        <div className="links-orbs">
          {orbs.map((orb, i) => (
            <span
              key={i}
              className={`links-orb links-orb--${orb.tone}`}
              style={
                {
                  width: orb.size,
                  top: orb.top,
                  left: orb.left,
                  '--blur': `${orb.blur}px`,
                  '--time': `${orb.time}s`,
                  '--dx': `${orb.dx}px`,
                  '--dy': `${orb.dy}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <main id="main" className="mx-auto flex w-full max-w-[460px] flex-col px-4 pb-14 pt-4">
        <div className="flex justify-end">
          <ShareButton title={pageTitle} url={`${SITE.url}/links`} />
        </div>

        <header className="flex flex-col items-center text-center">
          <div className="glass links-avatar links-rise" style={turn(0)}>
            <Image
              src="/images/profile/links-avatar.jpg"
              alt={`Photo of ${SITE.name}`}
              width={224}
              height={224}
              sizes="102px"
              priority
            />
          </div>
          <h1 className="links-name links-rise" style={turn(1)}>
            {SITE.name}
          </h1>
          <p className="links-tagline links-rise" style={turn(2)}>
            {SITE.tagline}
          </p>
        </header>

        <ul className="mt-8 flex flex-col gap-3">
          {links.map((link, i) => (
            <li key={link.href}>
              <GlassLink {...link} index={i + 3} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
