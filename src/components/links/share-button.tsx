'use client';

import { Check, Share } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Opens the phone's share sheet. Where the browser has none, it copies the
 * address instead and says so for a moment.
 */
export function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function share() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // The visitor closed the share sheet: nothing more to do.
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={share}
        className="glass glass-button"
        aria-label="Share this page"
      >
        {copied ? (
          <Check size={19} aria-hidden="true" />
        ) : (
          <Share size={19} aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="glass glass-toast" data-open={copied}>
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}
