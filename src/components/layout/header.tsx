'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home',      href: '#home' },
  { name: 'About',     href: '#about' },
  { name: 'Languages', href: '#languages' },
  { name: 'DNA',       href: '#language-dna' },
  { name: 'Resume',    href: '#resume' },
  { name: 'Projects',  href: '#projects' },
  { name: 'Contact',   href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10,26,15,0.92)'
          : 'rgba(10,26,15,0.55)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-base font-semibold tracking-wider transition-opacity hover:opacity-80"
            style={{
              color: 'var(--brand-gold)',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.06em',
            }}
          >
            KU<span style={{ color: 'var(--brand-muted)' }}>.dev</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-7">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors duration-150 hover:text-[var(--brand-gold)]"
                style={{ color: 'var(--brand-muted)' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 transition-colors"
            style={{ color: 'var(--brand-muted)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{ borderTop: '1px solid var(--brand-border)', background: 'rgba(10,26,15,0.97)' }}
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-[var(--brand-gold)]"
                  style={{ color: 'var(--brand-muted)' }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
