'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { runWhileVisible } from '@/lib/animation-loop';
import { EDUCATION, LINKS, SITE } from '@/lib/site';

/* ─── Particle canvas ────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = 90;
    const CONNECTION_DIST = 130;
    const MOUSE_DIST = 160;
    const mouse = { x: -9999, y: -9999 };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.04;
          p.vy += (dy / dist) * force * 0.04;
          // Clamp speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.8) { p.vx *= 1.8 / speed; p.vy *= 1.8 / speed; }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,138,90,${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    // Resizing a canvas wipes it, so paint again straight away.
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    const stop = runWhileVisible(canvas, draw);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}

/* ─── Stats ──────────────────────────────────────────────── */
const STATIC_STATS = [
  { value: '1400+', label: 'SAT Score' },
  { value: '7.5',   label: 'IELTS Band' },
  { value: '6',     label: 'Languages' },
];

function SessionTimer() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <div className="py-5 px-3 text-center"
      style={{ background: 'rgba(11,26,15,0.9)' }}>
      <div className="text-2xl font-bold text-gold-gradient"
        style={{ fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em' }}>
        {mm}:{ss}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--brand-muted)' }}>Session</div>
    </div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────── */
export function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: 'var(--brand-bg)' }}
    >
      <ParticleCanvas />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(26,61,38,0.55) 0%, transparent 70%)',
        }}
      />

      {/* Corner grid lines — techy accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--brand-gold) 1px, transparent 1px), linear-gradient(90deg, var(--brand-gold) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/*
        The name, role and buttons are plain markup with no entrance animation,
        so they are in the first paint and in the HTML that search engines read.
      */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 w-full text-center">
        {/* Profile image */}
        <div className="mx-auto mb-7 relative" style={{ width: 120, height: 120 }}>
          {/* Gold ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, var(--brand-gold), var(--brand-green-lit), var(--brand-gold))',
              padding: 2,
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{ background: 'var(--brand-bg)' }}
            >
              {!imageError ? (
                <Image
                  src="/images/profile/profile.jpg"
                  alt={SITE.name}
                  width={116}
                  height={116}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl font-bold"
                  style={{ color: 'var(--brand-gold)', background: 'var(--brand-bg-2)' }}
                >
                  K
                </div>
              )}
            </div>
          </div>

          {/* Orbit ring animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute"
            style={{ inset: -8, borderRadius: '50%', border: '1px dashed rgba(201,168,76,0.28)' }}
          />
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight"
          style={{ color: 'var(--brand-text)', letterSpacing: '-0.02em' }}
        >
          Khurshidbek
          <br />
          <span className="text-gold-gradient">Urazaliev</span>
        </h1>

        {/* What I do, in one line */}
        <p
          className="mt-6 mx-auto text-lg sm:text-xl font-medium leading-snug text-balance"
          style={{ color: 'var(--brand-text)' }}
        >
          {SITE.role} at{' '}
          <a
            href={SITE.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap underline decoration-1 underline-offset-4"
            style={{ color: 'var(--brand-gold)' }}
          >
            {SITE.company}
          </a>{' '}
          and{' '}
          {EDUCATION.field} student at{' '}
          <abbr title={EDUCATION.school} className="no-underline">{EDUCATION.schoolShort}</abbr>.
        </p>

        <p
          className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-balance"
          style={{ color: 'var(--brand-muted)' }}
        >
          I build web apps, mobile apps and AI tools with React, Next.js and Python.
        </p>

        {/* CTA buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: 'var(--brand-gold)',
              color: 'var(--brand-bg)',
            }}
          >
            View Projects
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Link>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              border: '1px solid var(--brand-border-hi)',
              color: 'var(--brand-text)',
              background: 'rgba(26,61,38,0.35)',
            }}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              border: '1px solid var(--brand-border)',
              color: 'var(--brand-muted)',
              background: 'transparent',
            }}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{ border: '1px solid var(--brand-border)', borderRadius: 12, overflow: 'hidden' }}
        >
          {STATIC_STATS.map((s, i) => (
            <div
              key={s.label}
              className="py-5 px-3 text-center"
              style={{
                background: i % 2 === 0 ? 'rgba(15,33,21,0.9)' : 'rgba(11,26,15,0.9)',
                borderRight: '1px solid var(--brand-border)',
              }}
            >
              <div
                className="text-2xl font-bold text-gold-gradient"
                style={{ fontFamily: 'var(--font-mono, monospace)' }}
              >
                {s.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--brand-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
          <SessionTimer />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5" style={{ color: 'var(--brand-gold-dim)' }} />
        </motion.div>
      </div>
    </section>
  );
}
