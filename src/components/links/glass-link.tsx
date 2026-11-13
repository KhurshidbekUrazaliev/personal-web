'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';

type GlassLinkProps = {
  href: string;
  title: string;
  detail: string;
  icon: ReactNode;
  /** Place in the list, used to stagger the entrance. */
  index: number;
};

/** Moves the row's light spot under the pointer (two CSS variables). */
function trackLight(event: PointerEvent<HTMLAnchorElement>) {
  const row = event.currentTarget;
  const box = row.getBoundingClientRect();
  row.style.setProperty('--gx', `${event.clientX - box.left}px`);
  row.style.setProperty('--gy', `${event.clientY - box.top}px`);
}

/** One glass row on the links page. */
export function GlassLink({ href, title, detail, icon, index }: GlassLinkProps) {
  const opensNewTab = /^https?:/.test(href);
  const shared = {
    className: 'glass glass-link links-rise',
    style: { '--i': index } as CSSProperties,
    onPointerMove: trackLight,
  };

  const content = (
    <>
      {icon}
      <span className="min-w-0 flex-1">
        <span className="glass-link-title">{title}</span>
        <span className="glass-link-detail">{detail}</span>
      </span>
      <ChevronRight className="glass-link-chevron" size={18} aria-hidden="true" />
      {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...shared}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}
