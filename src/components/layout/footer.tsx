import { Github, Linkedin, Mail, Instagram, Send, ExternalLink } from 'lucide-react';
import { EMAILS, LINKS } from '@/lib/site';

const socialLinks = [
  { name: 'GitHub',    href: LINKS.github,               icon: Github },
  { name: 'LinkedIn',  href: LINKS.linkedin,             icon: Linkedin },
  { name: 'Telegram',  href: LINKS.telegram,             icon: Send },
  { name: 'Email',     href: `mailto:${EMAILS.primary}`, icon: Mail },
  { name: 'Instagram', href: LINKS.instagram,            icon: Instagram },
];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--brand-border)', background: 'var(--brand-bg)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          {/* Logo */}
          <span
            className="font-mono text-sm font-semibold"
            style={{
              color: 'var(--brand-gold)',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.06em',
            }}
          >
            khurshidbek<span style={{ color: 'var(--brand-muted)' }}>.site</span>
          </span>

          {/* Social links: 44px targets so they are easy to tap */}
          <div className="flex">
            {socialLinks.map(item => (
              <a
                key={item.name}
                href={item.href}
                {...(item.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-150 hover:text-[var(--brand-gold)]"
                style={{ color: 'var(--brand-muted)' }}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5 md:items-end">
            <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>
              © {new Date().getFullYear()} Khurshidbek Urazaliev · Faith · Growth · Leverage
            </p>
            <a
              href={LINKS.frontendHub}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors duration-150 hover:text-[var(--brand-gold)]"
              style={{ color: 'var(--brand-muted)' }}
            >
              Also by me: Frontend Hub
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
