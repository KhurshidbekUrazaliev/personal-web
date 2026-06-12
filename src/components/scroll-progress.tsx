'use client';

import { useEffect } from 'react';
import { motion, useSpring, MotionValue } from 'framer-motion';

export function ScrollProgress() {
  const spring: MotionValue<number> = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      spring.set(pct);
    };
    // add listener on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    // set initial value
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [spring]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
      style={{ background: 'rgba(201,168,76,0.08)' }}>
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: spring,
          background: 'linear-gradient(90deg, var(--brand-green-mid), var(--brand-gold))',
          boxShadow: '0 0 8px rgba(201,168,76,0.5)',
        }}
      />
    </div>
  );
}
