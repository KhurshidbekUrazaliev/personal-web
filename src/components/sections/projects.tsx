'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Briefcase, Layers, Smartphone, Bot } from 'lucide-react';
import { useState } from 'react';
import { LINKS, SITE } from '@/lib/site';

type Category = 'work' | 'web' | 'mobile' | 'tools';
type Status = 'Live' | 'In progress';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: Category;
  /** Left out when a project is neither online nor being worked on right now. */
  status?: Status;
  liveUrl?: string;
  /** Text of the live link. Defaults to "Live site". */
  liveLabel?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'ai-haeba',
    title: 'AI 해바 (AI Haeba)',
    description:
      `AI marketing and business tools for small businesses in Korea. Sixteen connected tools carry one project from a business idea to products, branding, product pages and campaigns. One of my projects as a software engineer at ${SITE.company}.`,
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Base UI', 'Vercel'],
    category: 'work',
    status: 'Live',
    liveUrl: LINKS.aiHaeba,
    liveLabel: 'aihaeba.com',
  },
  {
    id: 'jinie-edutech',
    title: `${SITE.company} website`,
    description:
      `The website of ${SITE.company}, the education technology company I work at: coding and AI courses, its own hardware (coding drones, 3D printers, robots) and software. It runs in Korean, English, Japanese and Chinese. I upgraded much of it after I joined.`,
    technologies: ['PHP', 'GNUBoard', 'jQuery', 'JavaScript', 'HTML & CSS', 'AOS'],
    category: 'work',
    status: 'Live',
    liveUrl: SITE.companyUrl,
    liveLabel: 'jcodeedu.com',
  },
  {
    id: 'silk-node',
    title: 'Silk Node website',
    description:
      `The website of Silk Node, a custom software development company in Busan, in Korean and English. One of my projects as a software engineer at ${SITE.company}.`,
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    category: 'work',
    status: 'Live',
    liveUrl: 'https://silknode.ai.kr',
    liveLabel: 'silknode.ai.kr',
  },
  {
    id: 'frontend-hub',
    title: 'Frontend Hub',
    description:
      'A reference library of interface examples that run in the browser. Each one plays live next to the source that drives it, across layout, type, motion, interaction and WebGL.',
    technologies: ['Vite', 'JavaScript', 'GSAP', 'Three.js'],
    category: 'web',
    status: 'Live',
    liveUrl: LINKS.frontendHub,
    liveLabel: 'frontendhub.site',
    githubUrl: `${LINKS.github}/frontend-hub`,
  },
  {
    id: 'ilmulhaq',
    title: 'IlmulHaq Telegram bot',
    description:
      "A Telegram bot that answers questions about Islam in five languages. The AI only picks the references; the bot fetches the exact Qur'an and Hadith text itself, so no quote is made up. It also searches the Qur'an, gives prayer times and sends a daily ayah.",
    technologies: ['Python', 'python-telegram-bot', 'Gemini API', 'Vercel'],
    category: 'tools',
    status: 'Live',
    liveUrl: LINKS.ilmulHaqBot,
    liveLabel: 'Open in Telegram',
  },
  {
    id: 'lifepath-telegram',
    title: 'LifePath for Telegram',
    description:
      "LifePath as a Telegram Mini App: goals with real targets, daily habits, tasks and a calendar, with XP, streaks, opt-in rankings and reminders from the bot. Plans and progress are saved in Telegram's cloud, LifePath Plus is paid in Telegram Stars, and it runs in English, Uzbek and Russian.",
    technologies: ['React', 'TypeScript', 'Vite', 'Cloudflare Workers', 'Cloudflare D1', 'Telegram Mini Apps'],
    category: 'tools',
    status: 'Live',
    liveUrl: LINKS.lifePathBot,
    liveLabel: 'Open in Telegram',
    githubUrl: `${LINKS.github}/lifepath-miniapp`,
  },
  {
    id: 'lifepath',
    title: 'LifePath',
    description:
      'A mobile app for tracking everything you are working on, in folders, with XP, streaks and proof for each log. It works offline and syncs after Google sign-in, and an AI planner turns a goal and a deadline into calendar sessions.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Zustand'],
    category: 'mobile',
    status: 'In progress',
    githubUrl: `${LINKS.github}/lifepath`,
  },
  {
    id: 'try',
    title: 'TrY',
    description:
      'A trust-first sharing app: give something away, teach a lesson or propose a trade. Ratings are tied to completed exchanges, and a chat helps both sides arrange the handoff.',
    technologies: ['React Native', 'Expo Router', 'TypeScript', 'NativeWind', 'Express'],
    category: 'mobile',
    githubUrl: `${LINKS.github}/awesome-tracker-app`,
  },
  {
    id: 'korean-vocab',
    title: 'Korean Vocabulary App',
    description:
      'Flashcards and quizzes for the Korean words I am learning: 150 words in 15 daily sets, each with its own colour theme. I built it to learn React while studying Korean in Busan.',
    technologies: ['React', 'Tailwind CSS', 'GitHub Pages'],
    category: 'web',
    status: 'Live',
    liveUrl: 'https://khurshidbekurazaliev.github.io/korean-vocab-app/',
    githubUrl: `${LINKS.github}/korean-vocab-app`,
  },
  {
    id: 'study-tracker',
    title: 'Study & Discipline Tracker',
    description:
      "A command-line tool that logs daily habits (Python, Korean, Qur'an memorisation, reading, exercise), works out streaks and prints a weekly summary.",
    technologies: ['Python', 'JSON storage', 'pytest'],
    category: 'tools',
    githubUrl: `${LINKS.github}/study-tracker`,
  },
];

const STATUS_COLORS: Record<Status, string> = {
  'Live':        '#7DD4A8',
  'In progress': '#C9A84C',
};

const CATEGORIES: { id: 'all' | Category; label: string; icon: typeof Layers }[] = [
  { id: 'all',    label: 'All',          icon: Layers     },
  { id: 'work',   label: 'Work',         icon: Briefcase  },
  { id: 'web',    label: 'Web',          icon: Code2      },
  { id: 'mobile', label: 'Mobile',       icon: Smartphone },
  { id: 'tools',  label: 'Bots & tools', icon: Bot        },
];

const LINK_CLASS =
  'flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--brand-gold)]';

export function Projects() {
  const [active, setActive] = useState<'all' | Category>('all');

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" className="py-28" style={{ background: 'var(--brand-bg-2)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Built & <span className="text-gold-gradient">Building</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            My work at {SITE.company} and my own projects: web apps, mobile apps, Telegram bots and a command-line tool.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }} viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat.id} type="button" onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105"
              style={{
                background: active === cat.id ? 'var(--brand-gold)' : 'rgba(15,33,21,0.7)',
                color: active === cat.id ? 'var(--brand-bg)' : 'var(--brand-muted)',
                border: `1px solid ${active === cat.id ? 'var(--brand-gold)' : 'var(--brand-border)'}`,
                fontFamily: 'var(--font-mono,monospace)',
              }}>
              <cat.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'rgba(12,28,18,0.9)', border: '1px solid var(--brand-border)' }}
              >
                {/* Card top bar — gradient accent */}
                <div className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, var(--brand-green-mid), var(--brand-gold))` }} />

                {/* Header */}
                <div className="p-6 pb-4 flex items-start justify-between">
                  <h3 className="flex-1 min-w-0 text-base font-semibold" style={{ color: 'var(--brand-text)' }}>
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full ml-3 shrink-0"
                      style={{
                        background: `${STATUS_COLORS[project.status]}18`,
                        color: STATUS_COLORS[project.status],
                        border: `1px solid ${STATUS_COLORS[project.status]}44`,
                        fontFamily: 'var(--font-mono,monospace)',
                      }}>
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="px-6 text-sm leading-relaxed flex-1" style={{ color: 'var(--brand-muted)' }}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <ul className="px-6 pt-4 flex flex-wrap gap-1.5" aria-label="Built with">
                  {project.technologies.map(tech => (
                    <li key={tech} className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        color: 'var(--brand-gold)',
                        border: '1px solid rgba(201,168,76,0.18)',
                        fontFamily: 'var(--font-mono,monospace)',
                      }}>
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="px-6 py-4 mt-4 flex flex-wrap gap-x-5 gap-y-2"
                  style={{ borderTop: '1px solid var(--brand-border)' }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className={LINK_CLASS} style={{ color: 'var(--brand-text)' }}>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.liveLabel ?? 'Live site'}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className={LINK_CLASS} style={{ color: 'var(--brand-muted)' }}>
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
          className="mt-16 text-center">
          <p className="text-sm mb-6" style={{ color: 'var(--brand-muted)' }}>
            More projects being built. Follow along on GitHub.
          </p>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
            <Github className="h-4 w-4" aria-hidden="true" />
            View on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
