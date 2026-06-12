'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Brain, Briefcase, Layers } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const PROJECTS: {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  category: string;
  status: string;
  liveUrl?: string;
}[] = [
  {
    id: '1',
    title: 'Korean Vocabulary App',
    description: 'A web app to accelerate Korean vocabulary learning using spaced repetition and adaptive quizzes. Built while living in Busan — learning the language by building tools for it.',
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'web',
    status: 'In Progress',
  },
  {
    id: '2',
    title: 'SAT Prep AI Platform',
    description: 'An AI-powered SAT preparation tool that creates personalized study plans, adaptive practice questions, and tracks progress toward target scores. Built from personal experience chasing 1600.',
    technologies: ['React', 'Python', 'FastAPI', 'TailwindCSS', 'PostgreSQL'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'ai',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Chess Analysis Tool',
    description: 'A tool for analyzing chess games with pattern recognition and move suggestions. Studying classic games like Kasparov vs Topalov on the road to 2000 ELO.',
    technologies: ['Python', 'React', 'Flask', 'Chess.js'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'ai',
    status: 'Concept',
  },
  {
    id: '4',
    title: 'E-commerce Analytics Suite',
    description: 'A comprehensive analytics dashboard for dropshipping businesses. Tracks performance metrics, automates reporting, and surfaces competitor intelligence.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'business',
    status: 'Concept',
  },
  {
    id: '5',
    title: 'Islamic Prayer Times App',
    description: 'A mobile-first web app with accurate prayer times, Qibla direction, and Islamic calendar. Built with focus on offline functionality and clean, distraction-free UI.',
    technologies: ['React', 'PWA', 'Geolocation API', 'TailwindCSS'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'other',
    status: 'Concept',
  },
  {
    id: '6',
    title: 'Language Learning Tracker',
    description: 'A multilingual progress tracker with spaced repetition, community features, and visual progress maps. Inspired by tracking 6 languages simultaneously.',
    technologies: ['Next.js', 'Node.js', 'MySQL', 'Socket.io'],
    githubUrl: 'https://github.com/KhurshidbekUrazaliev',
    category: 'web',
    status: 'Concept',
  },
];

const STATUS_COLORS: Record<string, string> = {
  'Live':        '#7DD4A8',
  'In Progress': '#C9A84C',
  'Concept':     '#7AB8F5',
};

const CATEGORIES = [
  { id: 'all',      label: 'All',      icon: Layers  },
  { id: 'ai',       label: 'AI & ML',  icon: Brain   },
  { id: 'web',      label: 'Web',      icon: Code2   },
  { id: 'business', label: 'Business', icon: Briefcase },
];

export function Projects() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" className="py-28" style={{ background: 'var(--brand-bg-2)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)', letterSpacing: '0.2em' }}>
            05 / Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Built & <span className="text-gold-gradient">Building</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            Projects that solve real problems — from Korean vocabulary to chess analysis to SAT prep.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }} viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105"
              style={{
                background: active === cat.id ? 'var(--brand-gold)' : 'rgba(15,33,21,0.7)',
                color: active === cat.id ? 'var(--brand-bg)' : 'var(--brand-muted)',
                border: `1px solid ${active === cat.id ? 'var(--brand-gold)' : 'var(--brand-border)'}`,
                fontFamily: 'var(--font-mono,monospace)',
              }}>
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'rgba(12,28,18,0.9)', border: '1px solid var(--brand-border)' }}
              >
                {/* Card top bar — gradient accent */}
                <div className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, var(--brand-green-mid), var(--brand-gold))` }} />

                {/* Header */}
                <div className="p-6 pb-4 flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 group-hover:text-gold-gradient transition-colors"
                      style={{ color: 'var(--brand-text)' }}>
                      {project.title}
                    </h3>
                  </div>
                  {/* Status badge */}
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full ml-3 shrink-0"
                    style={{
                      background: `${STATUS_COLORS[project.status] ?? '#7AB8F5'}18`,
                      color: STATUS_COLORS[project.status] ?? '#7AB8F5',
                      border: `1px solid ${STATUS_COLORS[project.status] ?? '#7AB8F5'}44`,
                      fontFamily: 'var(--font-mono,monospace)',
                    }}>
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="px-6 text-sm leading-relaxed flex-1" style={{ color: 'var(--brand-muted)' }}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="px-6 pt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        color: 'var(--brand-gold)',
                        border: '1px solid rgba(201,168,76,0.18)',
                        fontFamily: 'var(--font-mono,monospace)',
                      }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="px-6 py-4 mt-2 flex gap-3"
                  style={{ borderTop: '1px solid var(--brand-border)' }}>
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--brand-gold)]"
                      style={{ color: 'var(--brand-muted)' }}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </Link>
                  )}
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--brand-gold)]"
                    style={{ color: 'var(--brand-muted)' }}>
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </Link>
                </div>
              </motion.div>
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
          <Link href="https://github.com/KhurshidbekUrazaliev" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
