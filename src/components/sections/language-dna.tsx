'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countWords, scanText, type ScanId, type ScanRow } from '@/lib/language-scanner';

/* ─── How each result row looks ──────────────────────────── */
const ROW_STYLE: Record<ScanId, { label: string; flag: string; color: string }> = {
  uzbek:   { label: 'Uzbek',   flag: '🇺🇿', color: '#C9A84C' },
  english: { label: 'English', flag: '🇬🇧', color: '#E8C46A' },
  turkish: { label: 'Turkish', flag: '🇹🇷', color: '#E8A87C' },
  russian: { label: 'Russian', flag: '🇷🇺', color: '#7AB8F5' },
  arabic:  { label: 'Arabic',  flag: '🇸🇦', color: '#A8D5A2' },
  korean:  { label: 'Korean',  flag: '🇰🇷', color: '#3D8A5A' },
  other:   { label: 'Another Latin-script language', flag: '🔤', color: '#7AAA88' },
};

const SAMPLES = [
  { label: 'Uzbek',           text: "Salom! Men Xurshidbekman, o'zbek tilida gapiraman." },
  { label: 'Arabic',          text: 'بسم الله الرحمن الرحيم السلام عليكم' },
  { label: 'Korean',          text: '안녕하세요 저는 부산에 살고 있어요 감사합니다' },
  { label: 'Turkish + Uzbek', text: 'Merhaba Salom bu yaxshi ŞEHİR Türkiye güzel' },
  { label: 'Russian',         text: 'Привет как дела я учусь каждый день спасибо' },
  { label: 'All six',         text: 'Hello مرحبا 안녕 Привет Salom Merhaba' },
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
  const [text, setText] = useState('');
  // The last text that was scanned, with its result.
  const [scan, setScan] = useState<{ text: string; rows: ScanRow[] }>({ text: '', rows: [] });

  // Scan a moment after the typing stops, not on every key.
  useEffect(() => {
    if (!text.trim()) return;
    const timer = setTimeout(() => setScan({ text, rows: scanText(text) }), 380);
    return () => clearTimeout(timer);
  }, [text]);

  const hasText   = text.trim() !== '';
  const scanning  = hasText && scan.text !== text;
  const results   = hasText && !scanning ? scan.rows : [];
  const wordCount = countWords(text);

  return (
    <section id="language-dna" className="py-20 relative overflow-hidden"
      style={{ background: 'var(--brand-bg)' }}>

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
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Language <span className="text-gold-gradient">Scanner</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            Paste any text. The scanner works out which of my six languages each word is written in. No AI, pure JavaScript.
          </p>
        </motion.div>

        {/* Main panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-2">

          {/* Input side */}
          <div className="flex flex-col gap-4">
            {/* Text input */}
            <div className="scan-frame relative rounded-xl overflow-hidden"
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
                aria-label="Text to scan"
                placeholder="Paste or type text in any of my languages...&#10;&#10;Try: Hello مرحبا 안녕 Привет Salom Merhaba"
                rows={6}
                className="scan-input w-full px-4 py-3 text-base resize-none"
                style={{ background: 'rgba(10,26,15,0.85)', color: 'var(--brand-text)', lineHeight: 1.7 }}
              />
            </div>

            {/* Sample buttons */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--brand-muted)' }}>Quick samples:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLES.map(s => (
                  <button key={s.label} type="button" onClick={() => setText(s.text)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid var(--brand-border)', color: 'var(--brand-muted)' }}>
                    {s.label}
                  </button>
                ))}
                {text && (
                  <button type="button" onClick={() => setText('')}
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
                  { v: wordCount, l: 'Words' },
                  { v: results.length, l: results.length === 1 ? 'Language found' : 'Languages found' },
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
                  Result
                </span>
                {results.length > 0 && !scanning && (
                  <span className="text-xs font-mono" style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-mono,monospace)' }}>
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                  </span>
                )}
              </div>

              <div className="p-4" aria-live="polite">
                <AnimatePresence mode="wait">
                  {!text ? (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="text-3xl mb-3 opacity-30" aria-hidden="true">🔬</div>
                      <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>
                        Type or paste text
                        <br />to see which languages are in it
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
                      <p className="text-xs" style={{ color: 'var(--brand-muted)' }}>No words found, only numbers or symbols</p>
                    </motion.div>
                  ) : (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="space-y-4">
                      {results.map((r, i) => {
                        const row = ROW_STYLE[r.id];
                        return (
                          <motion.div key={r.id}
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}>
                            <div className="flex items-center justify-between gap-3 mb-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base" aria-hidden="true">{row.flag}</span>
                                <span className="text-xs font-medium" style={{ color: 'var(--brand-text)' }}>{row.label}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-mono"
                                  style={{ color: row.color, fontFamily: 'var(--font-mono,monospace)' }}>
                                  {r.words} {r.words === 1 ? 'word' : 'words'}
                                </span>
                                <span className="text-xs font-mono font-bold"
                                  style={{ color: row.color, fontFamily: 'var(--font-mono,monospace)' }}>
                                  {r.share.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            <div className="h-2 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              <motion.div className="h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(r.share, 100)}%` }}
                                transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
                                style={{ background: `linear-gradient(90deg, ${row.color}77, ${row.color})` }} />
                            </div>
                          </motion.div>
                        );
                      })}
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
          className="text-center text-xs mt-6" style={{ color: 'var(--brand-muted)' }}>
          Zero API calls · Runs in your browser · Unicode ranges and short word lists, so treat it as an estimate
        </motion.p>

      </div>
    </section>
  );
}
