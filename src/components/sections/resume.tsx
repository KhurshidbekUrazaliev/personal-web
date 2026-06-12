'use client';

import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Skill, Experience, Achievement } from '@/types';

/* ─── Data ───────────────────────────────────────────────── */

const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 85, category: 'technical' },
  { name: 'React/Next.js',         level: 90, category: 'technical' },
  { name: 'Python',                level: 80, category: 'technical' },
  { name: 'Node.js',               level: 75, category: 'technical' },
  { name: 'AI/Machine Learning',   level: 70, category: 'technical' },
  { name: 'TailwindCSS',           level: 85, category: 'technical' },
  { name: 'Git/GitHub',            level: 80, category: 'technical' },
  { name: 'Database Design',       level: 70, category: 'technical' },

  { name: 'Uzbek',   level: 100, category: 'language' },
  { name: 'English', level: 95,  category: 'language' },
  { name: 'Korean',  level: 60,  category: 'language' },
  { name: 'Russian', level: 60,  category: 'language' },
  { name: 'Turkish', level: 50,  category: 'language' },
  { name: 'Arabic',  level: 40,  category: 'language' },

  { name: 'Leadership',      level: 85, category: 'soft' },
  { name: 'Communication',   level: 90, category: 'soft' },
  { name: 'Problem Solving', level: 90, category: 'soft' },
  { name: 'Time Management', level: 85, category: 'soft' },
];

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Personal Projects',
    duration: '2023 - Present',
    description: [
      'Built responsive web applications using React, Next.js, and TypeScript',
      'Implemented AI-powered features using modern ML libraries',
      'Created e-commerce solutions with Shopify integration',
      'Developed portfolio websites with focus on performance and SEO',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Python'],
  },
  {
    id: '2',
    title: 'SAT Prep Tutor',
    company: 'Freelance',
    duration: '2023 - Present',
    description: [
      'Helped students improve SAT scores through personalized teaching',
      'Developed custom study materials and practice tests',
      'Achieved consistent student score improvements of 200+ points',
      'Specialized in Math and English sections',
    ],
  },
  {
    id: '3',
    title: 'Business Development',
    company: 'Dropshipping Ventures',
    duration: '2022 - 2023',
    description: [
      'Launched and managed multiple e-commerce stores',
      'Implemented data-driven marketing strategies',
      'Achieved profitability through systematic product research',
      'Gained experience in international trade and logistics',
    ],
    technologies: ['Shopify', 'Facebook Ads', 'Google Analytics', 'Excel'],
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'SAT Score 1400+',
    description: 'Achieved high SAT score, aiming for 1600',
    date: '2024',
    category: 'academic',
  },
  {
    id: '2',
    title: 'IELTS Band 7.5',
    description: 'Demonstrated advanced English proficiency',
    date: '2024',
    category: 'academic',
  },
  {
    id: '3',
    title: '6 Languages',
    description: 'Uzbek, English, Korean, Russian, Turkish, Arabic',
    date: '2024',
    category: 'personal',
  },
  {
    id: '4',
    title: 'Chess 2000 ELO',
    description: 'Working towards 2000 ELO rating — studying classics',
    date: 'In Progress',
    category: 'personal',
  },
];

/* ─── Skill Bar ──────────────────────────────────────────── */
const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs">
      <span style={{ color: 'var(--brand-text)' }}>{skill.name}</span>
      <span style={{ color: 'var(--brand-muted)' }}>{skill.level}%</span>
    </div>
    <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
      <motion.div
        className="h-1.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{ background: 'linear-gradient(90deg, var(--brand-green-mid), var(--brand-gold))' }}
      />
    </div>
  </div>
);

/* ─── Chess Widget ───────────────────────────────────────── */
const PIECES: Record<string, string> = {
  K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙',
  k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟',
};

// Kasparov vs Topalov 1999 — position after move 24 (famous rook sacrifice)
const BOARD = [
  ['r','','','','k','','','r'],
  ['p','b','p','','','p','p','p'],
  ['','p','','p','','n','',''],
  ['','','','N','p','','',''],
  ['','','B','','P','','',''],
  ['','','','','','N','',''],
  ['P','P','P','','','P','P','P'],
  ['R','','','Q','K','B','','R'],
];

function ChessWidget() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="rounded-xl p-5 h-full"
      style={{ background: 'rgba(10,26,15,0.85)', border: '1px solid var(--brand-border)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.15em' }}
          >
            Side Activity
          </p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--brand-text)' }}>
            Chess · Kasparov vs Topalov
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--brand-muted)' }}>Wijk aan Zee, 1999</p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-mono shrink-0"
          style={{
            background: 'rgba(201,168,76,0.1)',
            color: 'var(--brand-gold)',
            border: '1px solid var(--brand-border)',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          → 2000 ELO
        </span>
      </div>

      {/* Board */}
      <div
        className="grid grid-cols-8 rounded-lg overflow-hidden mb-3"
        style={{ border: '1px solid rgba(201,168,76,0.18)' }}
      >
        {BOARD.map((row, r) =>
          row.map((piece, c) => {
            const key = `${r}-${c}`;
            const isLight = (r + c) % 2 === 0;
            const isHovered = hovered === key;
            return (
              <div
                key={key}
                onMouseEnter={() => piece ? setHovered(key) : null}
                onMouseLeave={() => setHovered(null)}
                className="aspect-square flex items-center justify-center transition-colors duration-100"
                style={{
                  background: isHovered
                    ? 'rgba(201,168,76,0.32)'
                    : isLight
                    ? 'rgba(46,102,68,0.4)'
                    : 'rgba(10,26,15,0.95)',
                  fontSize: 'clamp(9px, 1.8vw, 17px)',
                  cursor: piece ? 'default' : 'default',
                }}
              >
                {piece ? (
                  <span
                    style={{
                      color: piece === piece.toUpperCase() ? '#E8C46A' : '#7AAA88',
                      lineHeight: 1,
                    }}
                  >
                    {PIECES[piece]}
                  </span>
                ) : null}
              </div>
            );
          })
        )}
      </div>

      {/* File labels */}
      <div className="grid grid-cols-8 mb-3 px-0">
        {['a','b','c','d','e','f','g','h'].map(f => (
          <div key={f} className="text-center text-[9px]" style={{ color: 'var(--brand-muted)' }}>{f}</div>
        ))}
      </div>

      <p className="text-xs leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
        Kasparov sacrificed his rook on h6 — one of the most brilliant combinations ever played.
        Studying classics like this on the road to 2000. Hover the pieces.
      </p>
    </div>
  );
}

/* ─── Resume ─────────────────────────────────────────────── */
export function Resume() {
  const technical = skills.filter(s => s.category === 'technical');
  const languages = skills.filter(s => s.category === 'language');
  const soft      = skills.filter(s => s.category === 'soft');

  return (
    <section id="resume" className="py-28" style={{ background: 'var(--brand-bg)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}
          >
            04 / Resume
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Skills &amp; <span className="text-gold-gradient">Experience</span>
          </h2>
          <div className="mt-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}
            >
              <Download className="h-4 w-4" />
              Download PDF Resume
            </a>
          </div>
        </motion.div>

        {/* Skills grid + Chess widget */}
        <div className="grid gap-10 lg:grid-cols-3 mb-24 items-start">

          {/* Skills — 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-xl p-6"
              style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}
            >
              <div className="grid gap-8 sm:grid-cols-3">
                {/* Technical */}
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    Technical
                  </h4>
                  <div className="space-y-4">
                    {technical.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    Languages
                  </h4>
                  <div className="space-y-4">
                    {languages.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
                  </div>
                </div>

                {/* Soft */}
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    Soft Skills
                  </h4>
                  <div className="space-y-4">
                    {soft.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chess widget — 1 col */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ChessWidget />
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>
            Experience
          </h3>
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-6"
                style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--brand-text)' }}>
                      {exp.title}
                    </h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 mt-2 sm:mt-0 text-xs font-mono"
                    style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.duration}
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {exp.description.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--brand-muted)' }}>
                      <span style={{ color: 'var(--brand-gold)' }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span
                        key={tech}
                        className="rounded-full px-2.5 py-0.5 text-xs font-mono"
                        style={{
                          background: 'rgba(201,168,76,0.08)',
                          color: 'var(--brand-gold)',
                          border: '1px solid rgba(201,168,76,0.2)',
                          fontFamily: 'var(--font-mono, monospace)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: 'var(--brand-text)' }}>
            Key Achievements
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-200"
                style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}
              >
                <h4 className="font-semibold mb-2" style={{ color: 'var(--brand-text)' }}>
                  {a.title}
                </h4>
                <p className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>
                  {a.description}
                </p>
                <span
                  className="text-xs font-mono"
                  style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)' }}
                >
                  {a.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
