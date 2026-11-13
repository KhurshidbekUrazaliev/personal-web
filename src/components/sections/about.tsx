'use client';

import { motion } from 'framer-motion';
import { MapPin, Heart, Zap, Lightbulb, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { EDUCATION, SITE } from '@/lib/site';
import {
  LEVEL_STEPS,
  SPOKEN_LANGUAGES,
  type LanguageId,
  type SpokenLanguage,
} from '@/lib/languages';

/* ─── Data ───────────────────────────────────────────────── */

// Names and levels come from src/lib/languages.ts. Only the colours live here.
const LANGUAGE_COLORS: Record<LanguageId, string> = {
  uzbek:   '#1A9E6E',
  english: '#C9A84C',
  korean:  '#3D8A5A',
  russian: '#7AAA88',
  arabic:  '#5FA37A',
  turkish: '#9A7A32',
};

const languages = SPOKEN_LANGUAGES.map(lang => ({
  ...lang,
  color: LANGUAGE_COLORS[lang.id],
}));

const journey = [
  {
    year: '2006',
    location: 'Besharyk, Uzbekistan',
    flag: '🇺🇿',
    description:
      'Born into a quiet town on the edge of the Fergana Valley. Faith, family, and curiosity planted early.',
  },
  {
    year: '2022',
    location: 'Tashkent, Uzbekistan',
    flag: '🏙️',
    description:
      'First exposure to serious tech, coding, and the wider world through the internet.',
  },
  {
    year: '2024',
    location: 'Busan, South Korea',
    flag: '🇰🇷',
    description:
      'Landed in Busan chasing bigger horizons. Building projects, learning Korean, studying AI.',
  },
  {
    year: '→',
    location: 'Global Impact',
    flag: '🌍',
    description:
      'Building ventures that outlive me and give back — through code, knowledge, and community.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Faith',
    description: 'Islamic principles are the compass for every decision I make.',
    accent: '#C9A84C',
  },
  {
    icon: Zap,
    title: 'Discipline',
    description: 'Consistent daily effort beats sporadic bursts of motivation.',
    accent: '#3D8A5A',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Technology should solve real problems, not create impressive demos.',
    accent: '#C9A84C',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'Every skill, language, and setback is an investment in the future.',
    accent: '#3D8A5A',
  },
];

/* ─── Language card ──────────────────────────────────────── */
function LanguageCard({
  lang,
  index,
}: {
  lang: SpokenLanguage & { color: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const steps = LEVEL_STEPS[lang.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl p-5 transition-all duration-300 cursor-default"
      style={{
        background: hovered ? 'rgba(26,61,38,0.7)' : 'rgba(15,33,21,0.7)',
        border: `1px solid ${hovered ? lang.color + '55' : 'rgba(201,168,76,0.12)'}`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Flag + name row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{lang.flag}</span>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--brand-text)' }}>
              {lang.name}
            </div>
            <div
              className="text-xs"
              style={{
                color: 'var(--brand-muted)',
                fontFamily: lang.name === 'Arabic' ? 'serif' : 'inherit',
                direction: lang.name === 'Arabic' ? 'rtl' : 'ltr',
              }}
            >
              {lang.native}
            </div>
          </div>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: lang.color + '22',
            color: lang.color,
            border: `1px solid ${lang.color}44`,
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {lang.level}
        </span>
      </div>

      {/* Level meter: four steps, one per level. The badge above says it in words. */}
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4].map(step => (
          <motion.div
            key={step}
            className="h-1.5 flex-1 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 + step * 0.06 }}
            viewport={{ once: true }}
            style={{ background: step <= steps ? lang.color : 'rgba(255,255,255,0.07)' }}
          />
        ))}
      </div>

      {/* Note */}
      <div className="mt-2 text-xs" style={{ color: 'var(--brand-muted)' }}>
        {lang.note}
      </div>

      {/* Subtle corner glow on hover */}
      {hovered && (
        <div
          className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${lang.color}22, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}

/* ─── Journey Timeline ───────────────────────────────────── */
function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-5 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, var(--brand-gold), rgba(201,168,76,0.1))' }}
      />

      <div className="space-y-8">
        {journey.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-5 relative"
          >
            {/* Dot */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base z-10"
              style={{
                background: 'var(--brand-bg-2)',
                border: '1px solid var(--brand-border-hi)',
              }}
            >
              {step.flag}
            </div>

            {/* Content */}
            <div
              className="flex-1 rounded-xl p-4 pb-5"
              style={{
                background: 'rgba(15,33,21,0.6)',
                border: '1px solid var(--brand-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{
                    color: 'var(--brand-gold)',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  {step.year}
                </span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'var(--brand-muted)' }}
                />
                <span className="text-sm font-semibold" style={{ color: 'var(--brand-text)' }}>
                  {step.location}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main About ─────────────────────────────────────────── */
export function About() {
  return (
    <section
      id="about"
      className="py-28"
      style={{ background: 'var(--brand-bg)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--brand-text)' }}
          >
            The person behind
            <br />
            <span className="text-gold-gradient">the code</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: 'var(--brand-muted)' }}
          >
            From Besharyk to Busan — a journey shaped by faith, languages, and the relentless
            pursuit of meaningful technology.
          </p>
        </motion.div>

        {/* Story + Journey */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 mb-24">

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-semibold mb-6"
              style={{ color: 'var(--brand-text)' }}
            >
              My Story
            </h3>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
              <p>
                I grew up on the quiet edges of Besharyk, Uzbekistan — a small town in the Fergana
                Valley where curiosity had to travel far to find answers. Today I&apos;m living in
                Busan, South Korea, chasing a much bigger vision.
              </p>
              <p>
                I study {EDUCATION.field} at {EDUCATION.school} and
                work as a software engineer at {SITE.company}, building web apps, mobile apps and
                AI tools. But the résumé isn&apos;t the point — the point is building real things
                that people use.
              </p>
              <p>
                Six languages, two countries, one direction: forward. I&apos;m driven by faith, a
                healthy obsession with growth, and the belief that the best technology is built by
                people who understand the world beyond their screen.
              </p>
            </div>
          </motion.div>

          {/* Journey timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-semibold mb-6"
              style={{ color: 'var(--brand-text)' }}
            >
              Journey
            </h3>
            <Timeline />
          </motion.div>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--brand-text)' }}>
              6 languages · 4 scripts
            </h3>
            <div
              className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid var(--brand-border)',
                color: 'var(--brand-muted)',
              }}
            >
              <MapPin className="h-3 w-3" />
              Busan, KR
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((lang, i) => (
              <LanguageCard key={lang.name} lang={lang} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-2xl font-bold text-center mb-10"
            style={{ color: 'var(--brand-text)' }}
          >
            What drives me
          </h3>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-6 text-center group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(15,33,21,0.7)',
                  border: '1px solid var(--brand-border)',
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: v.accent + '1A', border: `1px solid ${v.accent}33` }}
                >
                  <v.icon className="h-5 w-5" style={{ color: v.accent }} />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--brand-text)' }}>
                  {v.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
