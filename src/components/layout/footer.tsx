import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub',    href: 'https://github.com/KhurshidbekUrazaliev',           icon: Github },
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/in/khurshidbekurazaliev/', icon: Linkedin },
  { name: 'Email',     href: 'mailto:khurshidbekurazaliev@gmail.com',              icon: Mail },
  { name: 'Instagram', href: 'https://www.instagram.com/cfarisc19/',                icon: Instagram },
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
            KU<span style={{ color: 'var(--brand-muted)' }}>.dev</span>
          </span>

          {/* Social links */}
          <div className="flex gap-5">
            {socialLinks.map(item => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="transition-colors duration-150 hover:text-[var(--brand-gold)]"
                style={{ color: 'var(--brand-muted)' }}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>
            © {new Date().getFullYear()} Khurshidbek Urazaliev · Faith · Growth · Leverage
          </p>
          <p className="text-xs opacity-20 font-mono" style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
            {/* try: sudo hire khurshidbek */}
          </p>
        </div>
      </div>
    </footer>
  );
}
