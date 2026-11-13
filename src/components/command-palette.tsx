'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMAILS, LINKS } from '@/lib/site';

// Same order as the sections in src/app/page.tsx.
const ITEMS = [
  { label: 'Home',              href: '#home',         icon: '🏠', group: 'Navigate'  },
  { label: 'Projects',          href: '#projects',     icon: '🚀', group: 'Navigate'  },
  { label: 'About',             href: '#about',        icon: '👤', group: 'Navigate'  },
  { label: 'Languages',         href: '#languages',    icon: '🌳', group: 'Navigate'  },
  { label: 'Language Scanner',  href: '#language-dna', icon: '🔬', group: 'Navigate'  },
  { label: 'Resume',            href: '#resume',       icon: '📄', group: 'Navigate'  },
  { label: 'Contact',           href: '#contact',      icon: '✉️', group: 'Navigate'  },
  { label: 'GitHub Profile',    href: LINKS.github,                 icon: '🐙', group: 'Links', external: true },
  { label: 'Telegram',          href: LINKS.telegram,               icon: '💬', group: 'Links', external: true },
  { label: 'Send Email',        href: `mailto:${EMAILS.primary}`,   icon: '📧', group: 'Links', external: true },
  { label: 'Frontend Hub',      href: LINKS.frontendHub,            icon: '🧩', group: 'Links', external: true },
];

type Item = (typeof ITEMS)[number];

/** Web links open in a new tab, mail links hand over to the mail app, the rest scroll. */
function follow(item: Item) {
  if (!item.external) {
    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
  } else if (item.href.startsWith('mailto:')) {
    window.location.href = item.href;
  } else {
    window.open(item.href, '_blank', 'noopener,noreferrer');
  }
}

export function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState('');
  const [cursor, setCursor]   = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);

  const close = useCallback(() => { setOpen(false); setQuery(''); setCursor(0); }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = ITEMS.filter(item =>
    !query || item.label.toLowerCase().includes(query.toLowerCase())
  );

  const go = (item: Item) => {
    close();
    follow(item);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === 'Enter') {
      // Check for secret command
      if (query.trim().toLowerCase() === 'sudo hire khurshidbek') {
        close();
        window.dispatchEvent(new CustomEvent('recruiter-terminal'));
        return;
      }
      const item = filtered[cursor];
      if (item) go(item);
    }
  };

  const groups = ['Navigate', 'Links'];

  return (
    <>
      {/* Trigger hint in bottom-right */}
      <button
        type="button"
        aria-label="Open search"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-105"
        style={{ background: 'rgba(10,26,15,0.85)', border: '1px solid var(--brand-border)', backdropFilter: 'blur(8px)' }}
        onClick={() => setOpen(true)}
      >
        <span className="text-xs" style={{ color: 'var(--brand-muted)' }}>Search</span>
        <kbd className="text-xs px-1.5 py-0.5 rounded font-mono"
          style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-mono,monospace)' }}>
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-start justify-center pt-[20vh] px-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={close}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Search"
              initial={{ scale: 0.94, y: -12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{ background: '#0A1A0F', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-base opacity-50" aria-hidden="true">🔍</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setCursor(0); }}
                  onKeyDown={handleKey}
                  aria-label="Search or type a command"
                  placeholder="Search or type a command…"
                  className="palette-input flex-1 bg-transparent text-base"
                  style={{ color: 'var(--brand-text)' }}
                />
                <kbd className="text-xs px-1.5 py-0.5 rounded font-mono hidden sm:block"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--brand-muted)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono,monospace)' }}>
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {groups.map(group => {
                  const groupItems = filtered.filter(i => i.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <div key={group}>
                      <p className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest"
                        style={{ color: 'rgba(122,170,136,0.7)', fontFamily: 'var(--font-mono,monospace)' }}>
                        {group}
                      </p>
                      {groupItems.map(item => {
                        const idx = filtered.indexOf(item);
                        return (
                          <button key={item.label} type="button" onClick={() => go(item)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                            style={{
                              background: idx === cursor ? 'rgba(201,168,76,0.1)' : 'transparent',
                              color: idx === cursor ? 'var(--brand-gold)' : 'var(--brand-text)',
                            }}
                            onMouseEnter={() => setCursor(idx)}
                          >
                            <span className="text-base w-6 text-center" aria-hidden="true">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                            {item.external && (
                              <span className="ml-auto text-xs" aria-hidden="true" style={{ color: 'var(--brand-muted)' }}>↗</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Secret hint */}
                {!query && (
                  <div className="px-4 py-3 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-xs font-mono opacity-25" style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                      💡 try: sudo hire khurshidbek
                    </p>
                  </div>
                )}

                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm" style={{ color: 'var(--brand-muted)' }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
