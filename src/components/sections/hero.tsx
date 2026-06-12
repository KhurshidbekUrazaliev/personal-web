'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = 90;
    const CONNECTION_DIST = 130;
    const MOUSE_DIST = 160;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

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
        if (dist < MOUSE_DIST) {
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

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ pointerEvents: 'auto' }}
    />
  );
}

/* ─── Terminal intro ─────────────────────────────────────── */
const TERMINAL_LINES = [
  { prefix: '❯ ', text: 'whoami', delay: 0, type: 'cmd' },
  { prefix: '',  text: 'khurshidbek_urazaliev', delay: 420, type: 'output' },
  { prefix: '❯ ', text: 'cat identity.json', delay: 900, type: 'cmd' },
  { prefix: '',  text: '{', delay: 1260, type: 'output' },
  { prefix: '',  text: '  "role":      "AI & Tech Innovator",', delay: 1460, type: 'output' },
  { prefix: '',  text: '  "location":  "Busan, South Korea 🇰🇷",', delay: 1640, type: 'output' },
  { prefix: '',  text: '  "languages": ["uz","en","ko","ru","tr","ar"],', delay: 1820, type: 'output' },
  { prefix: '',  text: '  "mission":   "build · learn · give back"', delay: 2020, type: 'output' },
  { prefix: '',  text: '}', delay: 2200, type: 'output' },
  { prefix: '❯ ', text: 'initializing portfolio…', delay: 2600, type: 'cmd' },
];

function TypedLine({ text, prefix, onDone, isCmd }: {
  text: string; prefix: string; onDone?: () => void; isCmd: boolean;
}) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const full = prefix + text;
    const iv = setInterval(() => {
      i++;
      setShown(full.slice(0, i));
      if (i >= full.length) { clearInterval(iv); onDone?.(); }
    }, isCmd ? 55 : 18);
    return () => clearInterval(iv);
  }, [text, prefix, isCmd, onDone]);

  return (
    <div className={isCmd ? 'text-[var(--brand-gold)]' : 'text-[var(--brand-text)]'}>
      {shown}
      {shown.length < (prefix + text).length && (
        <span className="inline-block w-[7px] h-[14px] bg-[var(--brand-gold)] ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
}

function Terminal({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === TERMINAL_LINES.length - 1) {
          setTimeout(onDone, 820);
        }
      }, line.delay);
    });
  }, [onDone]);

  return (
    <div
      className="font-mono text-[13px] leading-7 w-full max-w-xl mx-auto"
      style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[var(--brand-border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[var(--brand-muted)] text-[11px]">khurshidbek — zsh</span>
      </div>

      {visibleLines.map(i => (
        <TypedLine
          key={i}
          prefix={TERMINAL_LINES[i].prefix}
          text={TERMINAL_LINES[i].text}
          isCmd={TERMINAL_LINES[i].type === 'cmd'}
        />
      ))}
    </div>
  );
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
  const [phase, setPhase] = useState<'terminal' | 'hero'>('terminal');
  const [imageError, setImageError] = useState(false);
  const handleTerminalDone = useCallback(() => setPhase('hero'), []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: 'var(--brand-bg)' }}
    >
      {/* Particle canvas — always visible */}
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

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 w-full">
        {/* ── Terminal phase ── */}
        <AnimatePresence>
          {phase === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-[var(--brand-border)] px-6 py-5"
              style={{ background: 'rgba(11,26,15,0.85)', backdropFilter: 'blur(12px)' }}
            >
              <Terminal onDone={handleTerminalDone} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero phase ── */}
        <AnimatePresence>
          {phase === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Profile image */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mx-auto mb-7 relative"
                style={{ width: 120, height: 120 }}
              >
                {/* Gold ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, var(--brand-gold), var(--brand-green-lit), var(--brand-gold))',
                    padding: 2,
                    borderRadius: '50%',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{ background: 'var(--brand-bg)' }}
                  >
                    {!imageError ? (
                      <Image
                        src="/images/profile/profile.jpg"
                        alt="Khurshidbek Urazaliev"
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
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                whileHover={{ x: [0, -2, 2, -1, 1, 0], transition: { duration: 0.35 } }}
                className="text-5xl sm:text-7xl font-bold tracking-tight cursor-default select-none"
                style={{ color: 'var(--brand-text)', letterSpacing: '-0.02em' }}
              >
                Khurshidbek
                <br />
                <span className="text-gold-gradient">Urazaliev</span>
              </motion.h1>

              {/* Mono tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-5 font-mono text-sm sm:text-base tracking-widest uppercase"
                style={{
                  color: 'var(--brand-gold)',
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.18em',
                }}
              >
                AI · Tech · Languages · Faith
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36 }}
                className="mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--brand-muted)' }}
              >
                Building technology that matters. From Besharyk to Busan —
                driven by curiosity, faith, and the will to create real leverage.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.44 }}
                className="mt-9 flex flex-wrap items-center justify-center gap-3"
              >
                <Link
                  href="#projects"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: 'var(--brand-gold)',
                    color: 'var(--brand-bg)',
                  }}
                >
                  View Projects
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <Link
                  href="https://github.com/KhurshidbekUrazaliev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    border: '1px solid var(--brand-border-hi)',
                    color: 'var(--brand-text)',
                    background: 'rgba(26,61,38,0.35)',
                  }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>

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
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </motion.div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.56 }}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      {phase === 'hero' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5" style={{ color: 'var(--brand-gold-dim)' }} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
