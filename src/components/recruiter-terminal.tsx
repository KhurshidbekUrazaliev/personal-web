'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDUCATION, EMAILS, LINKS, SITE } from '@/lib/site';

const SECRET = 'sudo hire khurshidbek';

const SEQUENCE = [
  { delay: 0,    text: '❯ sudo hire khurshidbek',                         type: 'cmd'      },
  { delay: 700,  text: '[sudo] password for recruiter: ••••••••',         type: 'output'   },
  { delay: 1400, text: 'Initializing candidate profile...',               type: 'output'   },
  { delay: 2000, text: '❯ cat khurshidbek.json',                          type: 'cmd'      },
  { delay: 2500, text: 'Running deep scan...',                            type: 'output'   },
  { delay: 3000, text: `[✓] Name .............. ${SITE.name}`,            type: 'result'   },
  { delay: 3300, text: `[✓] Role .............. ${SITE.role} @ ${SITE.company}`, type: 'result' },
  { delay: 3600, text: `[✓] Studies ........... ${EDUCATION.field}`,      type: 'result'   },
  { delay: 3900, text: `[✓] Location .......... ${SITE.location} 🇰🇷`,     type: 'result'   },
  { delay: 4200, text: '[✓] Languages ......... 6  (uz · en · ko · ru · ar · tr)', type: 'result' },
  { delay: 4500, text: '[✓] Stack ............. React · Next.js · React Native · Python', type: 'result' },
  { delay: 4800, text: '[✓] Faith-driven ...... true',                    type: 'result'   },
  { delay: 5100, text: '[✓] Adaptability ...... HIGH',                    type: 'result'   },
  { delay: 5400, text: '[✓] Remote-ready ...... true',                    type: 'result'   },
  { delay: 5800, text: '❯ generate --recommendation',                     type: 'cmd'      },
  { delay: 6400, text: 'Analyzing data...',                               type: 'output'   },
  { delay: 6900, text: '█████████████████████████████████ 100%',          type: 'progress' },
  { delay: 7500, text: '',                                                 type: 'spacer'   },
  { delay: 7600, text: '╔══════════════════════════════════════╗',        type: 'border'   },
  { delay: 7700, text: '║   VERDICT: HIRE IMMEDIATELY  ✓       ║',       type: 'final'    },
  { delay: 7800, text: '╚══════════════════════════════════════╝',        type: 'border'   },
  { delay: 8100, text: '',                                                 type: 'spacer'   },
  { delay: 8200, text: `Contact:  ${EMAILS.primary}`,                     type: 'contact'  },
  { delay: 8400, text: `Telegram: ${LINKS.telegram.replace('https://', '')}`, type: 'contact' },
  { delay: 8600, text: `GitHub:   ${LINKS.github.replace('https://', '')}`,   type: 'contact' },
];

/** Types `text` out one character at a time, once, from when the line appears. */
function useTypewriter(text: string, speed = 30) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= text.length) return;
    const timer = setTimeout(() => setCount(c => c + 1), speed);
    return () => clearTimeout(timer);
  }, [count, text, speed]);
  return text.slice(0, count);
}

function Line({ text, type }: { text: string; type: string }) {
  // Only commands are typed out; output appears at once. A typed command stays.
  const typed = useTypewriter(type === 'cmd' ? text : '', 45);
  const display = type === 'cmd' ? typed : text;

  const color =
    type === 'cmd'      ? '#C9A84C' :
    type === 'result'   ? '#7DD4A8' :
    type === 'final'    ? '#E8C46A' :
    type === 'border'   ? '#C9A84C' :
    type === 'contact'  ? '#A8D5A2' :
    type === 'progress' ? '#3D8A5A' :
    'rgba(212,232,216,0.7)';

  if (type === 'spacer') return <div className="h-2" />;

  return (
    <div className="font-mono text-xs leading-5 flex items-center gap-1.5" style={{ color }}>
      {display}
      {type === 'cmd' && typed.length < text.length && (
        <span className="inline-block w-1.5 h-3 bg-current animate-pulse" />
      )}
    </div>
  );
}

export function RecruiterTerminal() {
  const [visible, setVisible] = useState(false);
  // Goes up on every start, so typing the command again replays the sequence.
  const [run, setRun]         = useState(0);
  const [lines, setLines]     = useState<number[]>([]);
  const bufferRef = useRef('');
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = () => {
      setVisible(true);
      setLines([]);
      setRun(r => r + 1);
    };
    const handle = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.length !== 1) return;
      bufferRef.current += e.key.toLowerCase();
      if (bufferRef.current.length > SECRET.length) {
        bufferRef.current = bufferRef.current.slice(-SECRET.length);
      }
      if (bufferRef.current === SECRET) {
        bufferRef.current = '';
        start();
      }
    };
    window.addEventListener('keydown', handle);
    window.addEventListener('recruiter-terminal', start);
    return () => {
      window.removeEventListener('keydown', handle);
      window.removeEventListener('recruiter-terminal', start);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers = SEQUENCE.map((step, i) =>
      setTimeout(() => setLines(prev => [...prev, i]), step.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, run]);

  // The box is shorter than the full output, so follow the newest line.
  useEffect(() => {
    const box = outputRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const close = () => { setVisible(false); setLines([]); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Recruiter terminal"
            initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: '#0A1A0F', border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 0 80px rgba(201,168,76,0.12)' }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: '#0F2115' }}>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer" onClick={close} />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs font-mono" style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'var(--font-mono,monospace)' }}>
                recruiter@terminal — hire mode
              </span>
              <button onClick={close} className="text-xs opacity-40 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--brand-muted)' }}>ESC</button>
            </div>

            {/* Content */}
            <div ref={outputRef} className="p-5 min-h-64 max-h-96 overflow-y-auto">
              {lines.map(i => (
                <Line key={`${run}-${i}`} text={SEQUENCE[i].text} type={SEQUENCE[i].type} />
              ))}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 text-center" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              <span className="text-xs font-mono" style={{ color: 'rgba(122,170,136,0.4)', fontFamily: 'var(--font-mono,monospace)' }}>
                press ESC or click outside to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
