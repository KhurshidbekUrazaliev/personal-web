'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Script detection ───────────────────────────────────── */
interface DNAResult {
  label: string;
  langName: string;
  flag: string;
  score: number;
  color: string;
  chars: number;
}

function analyzeDNA(text: string): DNAResult[] {
  const clean = text.replace(/\s/g, '');
  if (!clean.length) return [];

  const counts = {
    arabic:  (text.match(/[\u0600-\u06FF\u0750-\u077F]/g) || []).length,
    cyril:   (text.match(/[\u0400-\u04FF]/g) || []).length,
    hangul:  (text.match(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g) || []).length,
    turkic:  (text.match(/[şğüöıçŞĞÜÖÇñ]/g) || []).length,
    latin:   (text.match(/[a-zA-Z]/g) || []).length,
    uzbek:   (text.match(/[oʻgʻOʻGʻ]/g) || []).length,
  };

  const total = Math.max(clean.length, 1);
  const latinBase = Math.max(0, counts.latin - counts.turkic);

  const raw: DNAResult[] = [
    { label: 'Arabic / Semitic',  langName: 'Arabic',  flag: '🇸🇦', score: (counts.arabic / total) * 100,  color: '#A8D5A2', chars: counts.arabic },
    { label: 'Cyrillic / Slavic', langName: 'Russian', flag: '🇷🇺', score: (counts.cyril / total) * 100,   color: '#7AB8F5', chars: counts.cyril  },
    { label: 'Korean / Hangul',   langName: 'Korean',  flag: '🇰🇷', score: (counts.hangul / total) * 100,  color: '#3D8A5A', chars: counts.hangul },
    { label: 'Turkic scripts',    langName: 'Turkish', flag: '🇹🇷', score: (counts.turkic / total) * 100,  color: '#E8A87C', chars: counts.turkic },
    { label: 'Latin / English',   langName: 'English', flag: '🇬🇧', score: (latinBase / total) * 100,      color: '#C9A84C', chars: latinBase     },
  ];

  return raw
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

const SAMPLES = [
  { label: 'Arabic sample',  text: 'بسم الله الرحمن الرحيم السلام عليكم' },
  { label: 'Korean sample',  text: '안녕하세요 저는 부산에 살고 있어요 감사합니다' },
  { label: 'Mixed Turkic',   text: 'Merhaba Salom bu yaxshi ŞEHİR Türkiye güzel' },
  { label: 'Russian sample', text: 'Привет как дела я учусь каждый день спасибо' },
  { label: 'Mixed all',      text: 'Hello مرحبا 안녕 Привет Salom Merhaba' },
];

/* ─── Scanning animation overlay ────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-0.5 pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)' }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function LanguageDNA() {
  const [text, setText]       = useState('');
  const [results, setResults] = useState<DNAResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!text.trim()) { setResults([]); setScanning(false); return; }
    setScanning(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResults(analyzeDNA(text));
      setScanning(false);
    }, 380);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text]);

  const totalDetected = results.reduce((a, r) => a + r.score, 0);

  return (
    <section id="language-dna" className="py-20 relative overflow-hidden"
      style={{ background: 'var(--brand-bg-2)' }}>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--brand-gold) 1px, transparent 1px), linear-gradient(90deg, var(--brand-gold) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)', letterSpacing: '0.2em' }}>
            03 / Language DNA
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Script <span className="text-gold-gradient">Scanner</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            Paste any text. Watch the scanner detect its linguistic DNA in real time. No AI, pure JavaScript.
          </p>
        </motion.div>

        {/* Main panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-2">

          {/* Input side */}
          <div className="flex flex-col gap-4">
            {/* Text input */}
            <div className="relative rounded-xl overflow-hidden"
              style={{ border: `1px solid ${text ? 'rgba(201,168,76,0.35)' : 'var(--brand-border)'}` }}>
              {scanning && <ScanLine />}
              <div className="flex items-center gap-2 px-3 py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,33,21,0.8)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: scanning ? '#C9A84C' : '#3D8A5A' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                  {scanning ? 'scanning...' : text ? 'analysis ready' : 'awaiting input'}
                </span>
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste or type text in any language...&#10;&#10;Try: Hello مرحبا 안녕 Привет"
                rows={6}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ background: 'rgba(10,26,15,0.85)', color: 'var(--brand-text)', lineHeight: 1.7 }}
              />
            </div>

            {/* Sample buttons */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--brand-muted)' }}>Quick samples:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLES.map(s => (
                  <button key={s.label} onClick={() => setText(s.text)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid var(--brand-border)', color: 'var(--brand-muted)' }}>
                    {s.label}
                  </button>
                ))}
                {text && (
                  <button onClick={() => setText('')}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.2)', color: 'rgba(255,120,120,0.8)' }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            {text && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-3 gap-2">
                {[
                  { v: text.replace(/\s/g, '').length, l: 'Characters' },
                  { v: text.split(/\s+/).filter(Boolean).length, l: 'Words' },
                  { v: results.length, l: 'Scripts found' },
                ].map(s => (
                  <div key={s.l} className="rounded-lg py-2 text-center"
                    style={{ background: 'rgba(10,26,15,0.7)', border: '1px solid var(--brand-border)' }}>
                    <div className="text-lg font-bold font-mono text-gold-gradient"
                      style={{ fontFamily: 'var(--font-mono,monospace)' }}>{s.v}</div>
                    <div className="text-xs" style={{ color: 'var(--brand-muted)' }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Results side */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden h-full min-h-48"
              style={{ background: 'rgba(10,26,15,0.85)', border: '1px solid var(--brand-border)' }}>
              {/* Results header */}
              <div className="px-4 py-2.5 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,33,21,0.8)' }}>
                <span className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)', letterSpacing: '0.15em' }}>
                  DNA Analysis
                </span>
                {totalDetected > 0 && (
                  <span className="text-xs font-mono" style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                    {Math.round(totalDetected)}% mapped
                  </span>
                )}
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  {!text ? (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="text-3xl mb-3 opacity-30">🔬</div>
                      <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>
                        Type or paste text on the left<br />to see the linguistic breakdown
                      </p>
                    </motion.div>
                  ) : scanning ? (
                    <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col gap-3 py-2">
                      {[80, 60, 45, 30].map((w, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.06)', width: `${w * 0.5}%` }} />
                          <motion.div className="h-6 rounded"
                            style={{ background: 'rgba(201,168,76,0.08)', width: `${w}%` }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} />
                        </div>
                      ))}
                    </motion.div>
                  ) : results.length === 0 ? (
                    <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center py-8">
                      <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>No recognized scripts detected</p>
                    </motion.div>
                  ) : (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="space-y-4">
                      {results.map((r, i) => (
                        <motion.div key={r.label}
                          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{r.flag}</span>
                              <span className="text-xs font-medium" style={{ color: 'var(--brand-text)' }}>{r.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono"
                                style={{ color: r.color, fontFamily: 'var(--font-mono,monospace)' }}>
                                {r.chars} chars
                              </span>
                              <span className="text-xs font-mono font-bold"
                                style={{ color: r.color, fontFamily: 'var(--font-mono,monospace)' }}>
                                {r.score.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="h-2 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <motion.div className="h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(r.score, 100)}%` }}
                              transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
                              style={{ background: `linear-gradient(90deg, ${r.color}77, ${r.color})` }} />
                          </div>
                        </motion.div>
                      ))}

                      {/* Undetected remainder */}
                      {totalDetected < 99 && text.trim() && (
                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Punctuation / Numbers</span>
                            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono,monospace)' }}>
                              {(100 - totalDetected).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-2 rounded-full"
                              style={{ width: `${Math.max(0, 100 - totalDetected)}%`, background: 'rgba(255,255,255,0.08)' }} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }} viewport={{ once: true }}
          className="text-center text-xs mt-6" style={{ color: 'rgba(122,170,136,0.35)' }}>
          Zero API calls · Pure browser JavaScript · Unicode script detection
        </motion.p>

      </div>
    </section>
  );
}
