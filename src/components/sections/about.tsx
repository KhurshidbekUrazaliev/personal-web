'use client';

import { motion } from 'framer-motion';
import { MapPin, Heart, Zap, Lightbulb, TrendingUp } from 'lucide-react';
import { useState } from 'react';

/* ─── Data ───────────────────────────────────────────────── */

const languages = [
  {
    name: 'Uzbek',
    native: "O'zbek",
    level: 'Native',
    percent: 100,
    flag: '🇺🇿',
    color: '#1A9E6E',
    note: 'Mother tongue',
  },
  {
    name: 'English',
    native: 'English',
    level: 'Advanced',
    percent: 95,
    flag: '🇬🇧',
    color: '#C9A84C',
    note: 'IELTS 7.5',
  },
  {
    name: 'Korean',
    native: '한국어',
    level: 'Intermediate',
    percent: 60,
    flag: '🇰🇷',
    color: '#3D8A5A',
    note: 'Living in Busan',
  },
  {
    name: 'Russian',
    native: 'Русский',
    level: 'Intermediate',
    percent: 60,
    flag: '🇷🇺',
    color: '#7AAA88',
    note: 'Post-Soviet fluency',
  },
  {
    name: 'Turkish',
    native: 'Türkçe',
    level: 'Elementary',
    percent: 50,
    flag: '🇹🇷',
    color: '#9A7A32',
    note: 'Linguistic sibling of Uzbek',
  },
  {
    name: 'Arabic',
    native: 'العربية',
    level: 'B1',
    percent: 40,
    flag: '🇸🇦',
    color: '#2E6644',
    note: 'Language of the Quran',
  },
];

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

/* ─── Language Bar ───────────────────────────────────────── */
function LanguageCard({
  lang,
  index,
}: {
  lang: (typeof languages)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

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

      {/* Progress bar */}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.07)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${lang.percent}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{ background: `linear-gradient(90deg, ${lang.color}88, ${lang.color})` }}
        />
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
      style={{ background: 'var(--brand-bg-2)' }}
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
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}
          >
            01 / About
          </p>
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
                I&apos;m building in AI, machine learning, and full-stack development, with a 1400+
                SAT score on the way to 1600 and an IELTS 7.5. But the résumé isn&apos;t the point
                — the point is building real things that create real leverage.
              </p>
              <p>
                Six languages, two continents, one direction: forward. I&apos;m driven by faith, a
                healthy obsession with growth, and the belief that the best technology is built by
                people who understand the world beyond their screen.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: '1400+', l: 'SAT (→1600)' },
                { v: '7.5', l: 'IELTS Band' },
                { v: '2000', l: 'Chess ELO goal' },
              ].map((f) => (
                <div
                  key={f.l}
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: 'rgba(10,26,15,0.8)',
                    border: '1px solid var(--brand-border)',
                  }}
                >
                  <div
                    className="text-xl font-bold font-mono text-gold-gradient"
                    style={{ fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    {f.v}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--brand-muted)' }}>
                    {f.l}
                  </div>
                </div>
              ))}
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
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-1"
                style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}
              >
                Languages
              </p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--brand-text)' }}>
                6 languages · 4 scripts
              </h3>
            </div>
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
          <p
            className="font-mono text-xs uppercase tracking-widest mb-1 text-center"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}
          >
            Core Values
          </p>
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
