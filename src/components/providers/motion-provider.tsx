'use client';

import * as React from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * Makes every Framer Motion animation on the site follow the visitor's
 * "reduce motion" setting: movement and scaling are skipped, fades stay.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
