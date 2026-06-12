'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ───────────────────────────────────────────────── */
const VOCAB_Q = ['Hello', 'Thank you', 'Good', 'Water', 'Friend'];

const LANGUAGES = [
  {
    id: 'uzbek', name: 'Uzbek', native: "O'zbek", flag: '🇺🇿',
    level: 'Native', percent: 100, family: 'Turkic', script: 'Latin / Cyrillic',
    sample: "Salom! Men Xurshidbekman.", translation: "Hello! I am Khurshidbek.",
    fact: "Your mother tongue — the heartbeat of childhood and the language your dreams still come in.",
    regions: ['Uzbekistan', 'Afghanistan', 'Tajikistan'],
    color: '#C9A84C', cx: 65, cy: 90,
    vocab: ["Salom", "Rahmat", "Yaxshi", "Suv", "Do'st"],
  },
  {
    id: 'turkish', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷',
    level: 'Elementary', percent: 50, family: 'Turkic', script: 'Latin',
    sample: "Merhaba! Türkçe öğreniyorum.", translation: "Hello! I am learning Turkish.",
    fact: "Linguistic cousin of Uzbek — same Turkic roots, ~60% mutual intelligibility.",
    regions: ['Turkey', 'Cyprus', 'Central Asia'],
    color: '#E8A87C', cx: 178, cy: 76,
    vocab: ["Merhaba", "Teşekkürler", "İyi", "Su", "Arkadaş"],
  },
  {
    id: 'russian', name: 'Russian', native: 'Русский', flag: '🇷🇺',
    level: 'Intermediate', percent: 60, family: 'East Slavic', script: 'Cyrillic',
    sample: "Привет! Я учусь каждый день.", translation: "Hello! I study every day.",
    fact: "Post-Soviet lingua franca — bridges cultures across 15 former republics.",
    regions: ['Russia', 'Central Asia', 'Eastern Europe'],
    color: '#7AB8F5', cx: 292, cy: 72,
    vocab: ["Привет", "Спасибо", "Хорошо", "Вода", "Друг"],
  },
  {
    id: 'english', name: 'English', native: 'English', flag: '🇬🇧',
    level: 'Advanced', percent: 95, family: 'Germanic', script: 'Latin',
    sample: "The language of global leverage and technology.",
    translation: '',
    fact: "IELTS 7.5 — the key that opens every international door.",
    regions: ['Worldwide', 'UK', 'USA', 'South Korea'],
    color: '#C9A84C', cx: 420, cy: 68,
    vocab: ["Hello", "Thank you", "Good", "Water", "Friend"],
  },
  {
    id: 'arabic', name: 'Arabic', native: 'العربية', flag: '🇸🇦',
    level: 'B1', percent: 40, family: 'Semitic', script: 'Arabic (RTL)',
    sample: "بسم الله الرحمن الرحيم",
    translation: "In the name of God, the Most Gracious.",
    fact: "The language of the Quran — every word studied is an act of worship.",
    regions: ['Middle East', 'North Africa', '22 countries'],
    color: '#A8D5A2', cx: 548, cy: 72,
    vocab: ["مرحبا", "شكراً", "جيد", "ماء", "صديق"],
  },
  {
    id: 'korean', name: 'Korean', native: '한국어', flag: '🇰🇷',
    level: 'Intermediate', percent: 60, family: 'Koreanic', script: 'Hangul',
    sample: "안녕하세요! 부산에 살고 있어요.",
    translation: "Hello! I live in Busan.",
    fact: "Living in Busan — immersed daily in the language, the culture, and the 삼겹살.",
    regions: ['South Korea', 'North Korea', 'Worldwide diaspora'],
    color: '#3D8A5A', cx: 678, cy: 82,
    vocab: ["안녕하세요", "감사합니다", "좋아요", "물", "친구"],
  },
];

/* ─── SVG tree paths ─────────────────────────────────────── */
const BRANCH_SEGS = [
  { d: 'M 390 428 L 390 285',                                                         w: 9,   delay: 0    },
  { d: 'M 390 285 C 268 268 168 238 105 205',                                         w: 4.5, delay: 0.55 },
  { d: 'M 105 205 C 85 172 70 135 65 90',                                             w: 2.5, delay: 0.85 },
  { d: 'M 105 205 C 132 172 158 132 178 76',                                          w: 2.5, delay: 0.85 },
  { d: 'M 390 285 C 355 252 318 220 292 190 L 292 72',                                w: 3,   delay: 0.60 },
  { d: 'M 390 285 C 400 252 418 218 420 185 L 420 68',                                w: 4,   delay: 0.50 },
  { d: 'M 390 285 C 432 255 492 220 530 188 C 542 162 548 125 548 72',                w: 2.5, delay: 0.62 },
  { d: 'M 390 285 C 482 260 592 228 648 195 C 662 168 672 130 678 82',                w: 2.5, delay: 0.58 },
];

const FULL_PATHS: Record<string, string> = {
  uzbek:   'M 390 285 C 268 268 168 238 105 205 C 85 172 70 135 65 90',
  turkish: 'M 390 285 C 268 268 168 238 105 205 C 132 172 158 132 178 76',
  russian: 'M 390 285 C 355 252 318 220 292 190 L 292 72',
  english: 'M 390 285 C 400 252 418 218 420 185 L 420 68',
  arabic:  'M 390 285 C 432 255 492 220 530 188 C 542 162 548 125 548 72',
  korean:  'M 390 285 C 482 260 592 228 648 195 C 662 168 672 130 678 82',
};

/* ─── TTS ────────────────────────────────────────────────── */
const LANG_CODES: Record<string, string> = {
  uzbek: 'uz-UZ', turkish: 'tr-TR', russian: 'ru-RU',
  english: 'en-US', arabic: 'ar-SA', korean: 'ko-KR',
};

function getSignalBars(percent: number): number {
  if (percent >= 85) return 4;
  if (percent >= 55) return 3;
  if (percent >= 35) return 2;
  return 1;
}

function speak(text: string, langId: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = LANG_CODES[langId] ?? 'en-US';
  utt.rate = 0.88;
  window.speechSynthesis.speak(utt);
}

/* ─── Pronunciation challenge ────────────────────────────── */
type MicState = 'idle' | 'listening' | 'done';

// Word-overlap similarity (much better than char-by-char)
function wordSimilarity(heard: string, expected: string): number {
  const clean = (s: string) => s.toLowerCase().replace(/[^\w\s\u0600-\u06FF\uAC00-\uD7AF\u0400-\u04FF]/g, '').trim();
  const h = clean(heard).split(/\s+/).filter(Boolean);
  const e = clean(expected).split(/\s+/).filter(Boolean);
  if (!e.length) return 0;
  const matched = h.filter(hw => e.some(ew => ew.includes(hw) || hw.includes(ew) || hw === ew)).length;
  return (matched / e.length) * 100;
}

function PronounceButton({ text, langId, color }: { text: string; langId: string; color: string }) {
  const [micState, setMicState]     = useState<MicState>('idle');
  const [score, setScore]           = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [errMsg, setErrMsg]         = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef    = useRef<any>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try { recRef.current?.stop(); } catch {}
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const listen = () => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setErrMsg('Needs Chrome browser');
      return;
    }

    // Stop any running recognition first
    try { recRef.current?.stop(); } catch {}
    if (timerRef.current) clearTimeout(timerRef.current);

    setMicState('listening');
    setScore(null);
    setTranscript('');
    setErrMsg('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new SR() as any;
    recRef.current = rec;

    // uz-UZ not supported in any browser — fallback to en-US so mic still works
    rec.lang            = langId === 'uzbek' ? 'tr-TR' : (LANG_CODES[langId] ?? 'en-US');
    rec.interimResults  = false;
    rec.maxAlternatives = 5;
    rec.continuous      = false;

    let gotResult = false;

    // Auto-stop after 7 seconds
    timerRef.current = setTimeout(() => {
      if (!gotResult) { try { rec.stop(); } catch {} }
    }, 7000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      gotResult = true;
      if (timerRef.current) clearTimeout(timerRef.current);

      // Try all alternatives, take the best score
      const alts: string[] = [];
      for (let i = 0; i < e.results[0].length; i++) {
        alts.push(e.results[0][i].transcript);
      }
      const best = Math.max(...alts.map(a => wordSimilarity(a, text)));
      setTranscript(alts[0] ?? '');
      setScore(Math.min(100, Math.round(best) + 12)); // small encouragement
      setMicState('done');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (!gotResult) {
        const msg = e.error === 'not-allowed'  ? '⚠️ Microphone permission denied'
                  : e.error === 'no-speech'    ? '⚠️ No speech detected — try again'
                  : e.error === 'network'      ? '⚠️ Network error — check connection'
                  : `⚠️ Error: ${e.error}`;
        setErrMsg(msg);
        setMicState('idle');
      }
    };

    rec.onend = () => {
      if (!gotResult) setMicState(prev => prev === 'listening' ? 'idle' : prev);
    };

    try { rec.start(); } catch {
      setErrMsg('⚠️ Could not start microphone');
      setMicState('idle');
    }
  };

  const scoreColor = score === null ? color
    : score >= 70 ? '#7DD4A8'
    : score >= 40 ? '#C9A84C'
    : '#FF8A80';

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={listen}
          disabled={micState === 'listening'}
          className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-60 font-mono"
          style={{ background: `${color}15`, border: `1px solid ${color}40`, color, fontFamily: 'var(--font-mono,monospace)' }}
        >
          {micState === 'listening'
            ? <motion.span animate={{ scale: [1,1.4,1] }} transition={{ duration: 0.6, repeat: Infinity }}>🎙️</motion.span>
            : '🎤'}
          {micState === 'idle'      ? 'Pronounce it'
           : micState === 'listening' ? 'Listening…'
           : 'Try again'}
        </button>

        {score !== null && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-bold font-mono"
            style={{ color: scoreColor, fontFamily: 'var(--font-mono,monospace)' }}
          >
            {score}% {score >= 70 ? '🎉' : score >= 40 ? '👍' : '📚'}
          </motion.span>
        )}
      </div>

      {transcript && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs italic" style={{ color: 'var(--brand-muted)' }}>
          Heard: &ldquo;{transcript}&rdquo;
        </motion.p>
      )}
      {errMsg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs" style={{ color: '#FF8A80' }}>
          {errMsg}
        </motion.p>
      )}
      {micState === 'listening' && (
        <motion.div className="flex items-center gap-1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {[0,1,2,3].map(i => (
            <motion.div key={i} className="w-1 rounded-full"
              style={{ background: color, height: 12 }}
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
          ))}
          <span className="text-xs ml-1" style={{ color: 'var(--brand-muted)' }}>
            Speak now… (7s)
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Quiz Panel ─────────────────────────────────────────── */
function QuizPanel({ lang }: { lang: (typeof LANGUAGES)[0] }) {
  const [qIdx, setQIdx]         = useState(0);
  const [score, setScore]       = useState(0);
  const [chosen, setChosen]     = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const total   = VOCAB_Q.length;
  const correct = lang.vocab[qIdx];

  const options = useMemo(() => {
    const wrong = LANGUAGES
      .filter(l => l.id !== lang.id)
      .map(l => l.vocab[qIdx])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, lang.id]);

  const pick = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    if (opt === correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qIdx + 1 >= total) setFinished(true);
      else { setQIdx(q => q + 1); setChosen(null); }
    }, 900);
  };

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setFinished(false); };

  const isRTL   = lang.id === 'arabic';
  const isCJK   = lang.id === 'korean';
  const isCyril = lang.id === 'russian';

  if (finished) return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">{score === total ? '🎉' : score >= 3 ? '👍' : '📚'}</div>
      <p className="text-3xl font-bold mb-1" style={{ color: lang.color }}>{score}/{total}</p>
      <p className="text-sm mb-5" style={{ color: 'var(--brand-muted)' }}>
        {score === total ? 'Perfect score!' : score >= 3 ? 'Good job!' : 'Keep studying!'}
      </p>
      <button onClick={reset}
        className="text-xs px-5 py-2 rounded-lg font-mono transition-all hover:scale-105"
        style={{ background: `${lang.color}22`, color: lang.color, border: `1px solid ${lang.color}44`, fontFamily: 'var(--font-mono,monospace)' }}>
        ↺ Try Again
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="w-6 h-1 rounded-full transition-all duration-300"
              style={{ background: i < qIdx ? lang.color : i === qIdx ? `${lang.color}88` : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <span className="text-xs font-mono" style={{ color: lang.color, fontFamily: 'var(--font-mono,monospace)' }}>
          {score} pts
        </span>
      </div>
      <p className="text-xs mb-1" style={{ color: 'var(--brand-muted)' }}>How do you say in {lang.name}?</p>
      <p className="text-2xl font-bold mb-5" style={{ color: 'var(--brand-text)' }}>
        &ldquo;{VOCAB_Q[qIdx]}&rdquo;
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => {
          const isCorrect = opt === correct;
          const isChosen  = chosen === opt;
          let bg = 'rgba(255,255,255,0.04)', border = 'rgba(255,255,255,0.08)', txtColor = 'var(--brand-text)';
          if (chosen) {
            if (isCorrect)     { bg = 'rgba(61,138,90,0.28)'; border = '#3D8A5A88'; txtColor = '#7DD4A8'; }
            else if (isChosen) { bg = 'rgba(220,80,80,0.2)';  border = 'rgba(220,80,80,0.5)'; txtColor = 'rgba(255,120,120,0.9)'; }
            else               { txtColor = 'rgba(255,255,255,0.3)'; }
          }
          return (
            <motion.button key={i} onClick={() => pick(opt)} disabled={!!chosen}
              className="p-3 rounded-xl text-center transition-colors duration-200"
              style={{ background: bg, border: `1px solid ${border}`, color: txtColor,
                cursor: chosen ? 'default' : 'pointer',
                fontFamily: isRTL || isCyril || isCJK ? 'serif' : 'inherit',
                direction: isRTL ? 'rtl' : 'ltr',
                fontSize: isCJK || isRTL ? '1.15rem' : '0.9rem', fontWeight: 600 }}
              whileHover={!chosen ? { scale: 1.04 } : {}}
              whileTap={!chosen ? { scale: 0.96 } : {}}
            >
              {opt}
              {chosen && isCorrect && <span className="ml-1">✓</span>}
              {chosen && isChosen && !isCorrect && <span className="ml-1">✗</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Falling leaves ─────────────────────────────────────── */
interface Leaf { x:number; y:number; vx:number; vy:number; r:number; vr:number; size:number; opacity:number; color:string }
const LEAF_COLORS = ['#C9A84C44','#3D8A5A55','#7AAA8844','#9A7A3244'];

function LeavesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const leaves: Leaf[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 600 - 300,
      vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.6 + 0.25,
      r: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.025,
      size: Math.random() * 5 + 3, opacity: Math.random() * 0.35 + 0.08,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const leaf of leaves) {
        leaf.x += leaf.vx + Math.sin(leaf.y * 0.018) * 0.28;
        leaf.y += leaf.vy;
        leaf.r += leaf.vr;
        if (leaf.y > canvas.height + 20) { leaf.y = -20; leaf.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.r);
        ctx.globalAlpha = leaf.opacity;
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 0.6, leaf.size * 1.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

/* ─── Pulse dot ──────────────────────────────────────────── */
function Pulse({ langId, active }: { langId: string; active: boolean }) {
  if (!active) return null;
  const d = FULL_PATHS[langId];
  if (!d) return null;
  return (
    <motion.path d={d} fill="none" stroke="rgba(201,168,76,0.95)"
      strokeWidth={3} strokeLinecap="round" pathLength={1}
      strokeDasharray="0.06 1"
      animate={{ strokeDashoffset: [0.06, -1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      filter="url(#goldGlow)"
    />
  );
}

/* ─── Main ───────────────────────────────────────────────── */
type Tab = 'info' | 'quiz';

export function LanguageTree() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered]   = useState<string | null>(null);
  const [tab, setTab]           = useState<Tab>('info');
  const lang = LANGUAGES.find(l => l.id === selected);

  const selectLang = (id: string) => {
    setSelected(prev => prev === id ? null : id);
    setTab('info');
  };

  return (
    <section id="languages" className="py-24 relative overflow-hidden"
      style={{ background: 'var(--brand-bg)' }}>
      <LeavesCanvas />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(26,61,38,0.38) 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.2em' }}>
            02 / Languages
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            The Tree of <span className="text-gold-gradient">Tongues</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            6 languages · 4 scripts · 3 continents. Hover a fruit to feel the signal. Click to explore.
          </p>
        </motion.div>

        {/* SVG Tree */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
          <svg viewBox="0 0 780 435" className="w-full select-none" style={{ maxHeight: 435 }}>
            <defs>
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="trunkGrad" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="rgba(201,168,76,0.25)" />
                <stop offset="100%" stopColor="rgba(46,102,68,0)" />
              </radialGradient>
            </defs>

            <motion.ellipse cx={390} cy={428} rx={72} ry={7} fill="rgba(46,102,68,0.28)"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.9 }} viewport={{ once: true }} />

            <motion.path d="M 390 428 L 390 285" stroke="url(#trunkGrad)" strokeWidth={18} fill="none"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.1 }} viewport={{ once: true }} />

            {BRANCH_SEGS.map((seg, i) => (
              <motion.path key={i} d={seg.d} fill="none" strokeLinecap="round"
                stroke="rgba(46,102,68,0.88)" strokeWidth={seg.w}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: seg.delay, ease: 'easeInOut' }}
                viewport={{ once: true }} />
            ))}

            {(hovered || selected) && (() => {
              const activeId   = hovered || selected!;
              const activeLang = LANGUAGES.find(l => l.id === activeId);
              if (!activeLang || !FULL_PATHS[activeId]) return null;
              return (
                <motion.path d={FULL_PATHS[activeId]} fill="none" strokeLinecap="round"
                  stroke={`${activeLang.color}55`} strokeWidth={4}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }} />
              );
            })()}

            {LANGUAGES.map(l => (
              <Pulse key={l.id} langId={l.id} active={hovered === l.id || selected === l.id} />
            ))}

            {LANGUAGES.map((l, i) => {
              const isSel  = selected === l.id;
              const isHov  = hovered === l.id;
              const active = isSel || isHov;
              return (
                <motion.g key={l.id} style={{ cursor: 'pointer' }}
                  initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1.05 + i * 0.1 }} viewport={{ once: true }}
                  onClick={() => selectLang(l.id)}
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}>
                  {active && (
                    <motion.circle cx={l.cx} cy={l.cy} r={28} fill="none"
                      stroke={l.color} strokeWidth={1.2}
                      animate={{ r: [22, 32], opacity: [0.6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }} />
                  )}
                  <motion.circle cx={l.cx} cy={l.cy} r={active ? 21 : 17}
                    fill={isSel ? l.color : 'rgba(12,28,18,0.95)'}
                    stroke={l.color} strokeWidth={active ? 2 : 1.4}
                    filter={active ? 'url(#goldGlow)' : undefined}
                    animate={{ r: active ? 21 : 17 }} transition={{ duration: 0.18 }} />
                  <text x={l.cx} y={l.cy + 6} textAnchor="middle"
                    fontSize={active ? '15' : '13'} style={{ userSelect: 'none' }}>
                    {l.flag}
                  </text>
                  <text x={l.cx} y={l.cy + 36} textAnchor="middle" fontSize="8.5"
                    fill={active ? l.color : 'rgba(122,170,136,0.7)'}
                    fontFamily="var(--font-mono, monospace)" style={{ userSelect: 'none' }}>
                    {l.name}
                  </text>
                  {/* Signal strength bars */}
                  {(() => {
                    const bars = getSignalBars(l.percent);
                    const bw = 2.5, gap = 1.5;
                    const totalW = 4 * bw + 3 * gap;
                    const sx = l.cx - totalW / 2;
                    const by = l.cy + (active ? 56 : 46);
                    return [1,2,3,4].map((h, idx) => (
                      <rect key={idx}
                        x={sx + idx * (bw + gap)} y={by - h * 2.2}
                        width={bw} height={h * 2.2} rx={0.8}
                        fill={idx < bars
                          ? (active ? l.color : 'rgba(122,170,136,0.45)')
                          : 'rgba(255,255,255,0.08)'}
                      />
                    ));
                  })()}
                  {active && (
                    <text x={l.cx} y={l.cy + 66} textAnchor="middle" fontSize="7"
                      fill="rgba(122,170,136,0.5)" fontFamily="var(--font-mono, monospace)"
                      style={{ userSelect: 'none' }}>
                      {l.family}
                    </text>
                  )}
                </motion.g>
              );
            })}

            <text x={390} y={425} textAnchor="middle" fontSize="9"
              fill="rgba(201,168,76,0.5)" fontFamily="var(--font-mono, monospace)"
              style={{ userSelect: 'none' }}>
              Khurshidbek Urazaliev
            </text>
          </svg>
        </motion.div>

        <AnimatePresence>
          {!selected && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-xs mt-2 mb-6" style={{ color: 'var(--brand-muted)' }}>
              ↑ click any fruit to explore
            </motion.p>
          )}
        </AnimatePresence>

        {/* Language card */}
        <AnimatePresence mode="wait">
          {lang && (
            <motion.div key={lang.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.32 }}
              className="mx-auto max-w-2xl rounded-2xl p-6"
              style={{ background: 'rgba(10,26,15,0.92)', border: `1px solid ${lang.color}44`, boxShadow: `0 0 48px ${lang.color}12` }}>

              {/* Flag + name */}
              <div className="flex items-start gap-4 mb-5">
                <div className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl shrink-0"
                  style={{ background: `${lang.color}14`, border: `1px solid ${lang.color}30` }}>
                  {lang.flag}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--brand-text)' }}>{lang.name}</h3>
                    <span className="text-sm" style={{ color: 'var(--brand-muted)' }}
                      dir={lang.id === 'arabic' ? 'rtl' : 'ltr'}>{lang.native}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{ background: `${lang.color}20`, color: lang.color, border: `1px solid ${lang.color}40`, fontFamily: 'var(--font-mono,monospace)' }}>
                      {lang.level}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>
                    {lang.family} family · {lang.script}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-lg mb-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {(['info', 'quiz'] as Tab[]).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className="flex-1 py-1.5 rounded-md text-xs font-mono transition-all"
                    style={{
                      background: tab === t ? `${lang.color}22` : 'transparent',
                      color: tab === t ? lang.color : 'var(--brand-muted)',
                      border: tab === t ? `1px solid ${lang.color}44` : '1px solid transparent',
                      fontFamily: 'var(--font-mono,monospace)',
                    }}>
                    {t === 'info' ? '📖 Info' : '🎯 Quiz'}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {tab === 'quiz' ? (
                  <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <QuizPanel lang={lang} />
                  </motion.div>
                ) : (
                  <motion.div key="info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {/* Proficiency bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: 'var(--brand-muted)' }}>Proficiency</span>
                        <span style={{ color: lang.color }}>{lang.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <motion.div className="h-1.5 rounded-full"
                          initial={{ width: 0 }} animate={{ width: `${lang.percent}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          style={{ background: `linear-gradient(90deg, ${lang.color}77, ${lang.color})` }} />
                      </div>
                    </div>

                    {/* Sample sentence */}
                    <div className="p-3 rounded-lg mb-3"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-base font-semibold leading-relaxed flex-1"
                          style={{
                            color: lang.color,
                            direction: lang.id === 'arabic' ? 'rtl' : 'ltr',
                            fontSize: ['arabic','korean','russian'].includes(lang.id) ? '1.05rem' : undefined,
                          }}>
                          {lang.sample}
                        </p>
                        <button onClick={() => speak(lang.sample, lang.id)}
                          className="text-lg opacity-60 hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                          title="Hear pronunciation">🔊</button>
                      </div>
                      {lang.translation && (
                        <p className="text-xs mt-1" style={{ color: 'var(--brand-muted)' }}>{lang.translation}</p>
                      )}
                      <PronounceButton text={lang.sample} langId={lang.id} color={lang.color} />
                    </div>

                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--brand-muted)' }}>
                      {lang.fact}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {lang.regions.map(r => (
                        <span key={r} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(122,170,136,0.08)', color: 'var(--brand-muted)', border: '1px solid rgba(122,170,136,0.15)' }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
