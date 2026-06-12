'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET = 'sudo hire khurshidbek';

const LINES = [
  { text: '> sudo hire khurshidbek',                          delay: 0,    type: 'cmd'     },
  { text: '[sudo] password for recruiter: ••••••••',          delay: 600,  type: 'muted'   },
  { text: '',                                                  delay: 1000, type: 'gap'     },
  { text: 'Initializing candidate analysis...',               delay: 1100, type: 'loading' },
  { text: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',              delay: 2000, type: 'bar'     },
  { text: '',                                                  delay: 2300, type: 'gap'     },
  { text: 'CANDIDATE PROFILE ──────────────────────────',     delay: 2400, type: 'header'  },
  { text: 'Name      Khurshidbek Urazaliev',                  delay: 2550, type: 'data'    },
  { text: 'Location  Busan, South Korea 🇰🇷',                 delay: 2700, type: 'data'    },
  { text: 'Origin    Besharyk, Uzbekistan 🇺🇿',               delay: 2850, type: 'data'    },
  { text: '',                                                  delay: 3000, type: 'gap'     },
  { text: 'LANGUAGES ──────────────────────────────────',     delay: 3050, type: 'header'  },
  { text: '[██████████]  Uzbek    Native',                     delay: 3200, type: 'lang'    },
  { text: '[█████████░]  English  IELTS 7.5',                  delay: 3350, type: 'lang'    },
  { text: '[██████░░░░]  Korean   Living in Busan',            delay: 3500, type: 'lang'    },
  { text: '[██████░░░░]  Russian  Post-Soviet',                delay: 3650, type: 'lang'    },
  { text: '[█████░░░░░]  Turkish  Turkic sibling of Uzbek',    delay: 3800, type: 'lang'    },
  { text: '[████░░░░░░]  Arabic   B1 · Language of Quran',     delay: 3950, type: 'lang'    },
  { text: '',                                                  delay: 4100, type: 'gap'     },
  { text: 'TECHNICAL ──────────────────────────────────',     delay: 4150, type: 'header'  },
  { text: 'Stack       React · Next.js · Python · AI/ML',     delay: 4300, type: 'data'    },
  { text: 'SAT Score   1400+ → targeting 1600',               delay: 4450, type: 'data'    },
  { text: 'Chess ELO   Working toward 2000',                  delay: 4600, type: 'data'    },
  { text: '',                                                  delay: 4750, type: 'gap'     },
  { text: 'COMPATIBILITY ──────────────────────────────',     delay: 4800, type: 'header'  },
  { text: 'Adaptability       ████████░░  HIGH',               delay: 4950, type: 'stat'    },
  { text: 'Learning Speed     █████████░  VERY HIGH',          delay: 5100, type: 'stat'    },
  { text: 'Global Readiness   █████████░  HIGH',               delay: 5250, type: 'stat'    },
  { text: 'Faith-Driven Focus ██████████  MAXIMUM',            delay: 5400, type: 'stat'    },
  { text: '',                                                  delay: 5550, type: 'gap'     },
  { text: 'VERDICT ────────────────────────────────────',     delay: 5600, type: 'header'  },
  { text: '⚡ HIRE IMMEDIATELY',                               delay: 5800, type: 'verdict' },
  { text: '"Rare combination of linguistic range,',            delay: 6050, type: 'quote'   },
  { text: ' technical depth, and relentless drive."',          delay: 6200, type: 'quote'   },
  { text: '',                                                  delay: 6400, type: 'gap'     },
  { text: 'Press ESC to close · or keep reading...',          delay: 6550, type: 'hint'    },
];

function getColor(type: string) {
  if (type === 'cmd')     return '#C9A84C';
  if (type === 'header')  return '#3D8A5A';
  if (type === 'verdict') return '#E8C46A';
  if (type === 'quote')   return '#A8D5A2';
  if (type === 'hint')    return 'rgba(122,170,136,0.5)';
  if (type === 'muted')   return 'rgba(122,170,136,0.5)';
  if (type === 'loading') return '#7AB8F5';
  if (type === 'bar')     return '#3D8A5A';
  if (type === 'lang')    return '#C9A84C';
  if (type === 'stat')    return '#7AB8F5';
  return '#D4E8D8';
}

export function RecruiterTerminal() {
  const [, setBuffer]             = useState('');
  const [open, setOpen]           = useState(false);
  const [visibleLines, setVisible] = useState<number[]>([]);

  const close = useCallback(() => {
    setOpen(false);
    setVisible([]);
    setBuffer('');
  }, []);

  // Global keypress listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore if focused on input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'Escape') { close(); return; }
      if (e.key.length !== 1) return;

      setBuffer(prev => {
        const next = (prev + e.key).slice(-TARGET.length);
        if (next === TARGET) {
          setOpen(true);
          return '';
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Escape key also closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Stagger lines when opened
  useEffect(() => {
    if (!open) return;
    setVisible([]);
    LINES.forEach((line, i) => {
      setTimeout(() => setVisible(prev => [...prev, i]), line.delay);
    });
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(5,12,8,0.96)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 0 80px rgba(201,168,76,0.12)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3"
              style={{ background: 'rgba(15,33,21,0.98)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer" onClick={close} />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs" style={{ color: 'rgba(122,170,136,0.6)', fontFamily: 'var(--font-mono,monospace)' }}>
                recruiter@talent-acquisition — bash
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 max-h-[75vh] overflow-y-auto"
              style={{ background: 'rgba(8,20,12,0.99)', fontFamily: 'var(--font-mono,"JetBrains Mono",monospace)', fontSize: 13, lineHeight: 1.7 }}>
              {visibleLines.map(i => {
                const line = LINES[i];
                if (line.type === 'gap') return <div key={i} className="h-2" />;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ color: getColor(line.type), whiteSpace: 'pre' }}>
                    {line.text}
                    {/* Blinking cursor on last visible line */}
                    {i === Math.max(...visibleLines) && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{ display: 'inline-block', width: 8, height: 14, background: '#C9A84C', marginLeft: 2, verticalAlign: 'middle' }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
