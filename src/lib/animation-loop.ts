/**
 * Calls `tick` on every animation frame, but only while `element` is on
 * screen, the tab is visible and the visitor has not asked for reduced motion.
 *
 * `tick` runs once straight away, so there is always a still frame to show
 * (that single frame is all a reduced-motion visitor gets).
 *
 * Returns a function that stops the loop and removes the listeners.
 */
export function runWhileVisible(element: Element, tick: () => void): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frameId = 0;
  let running = false;
  let onScreen = false;

  const frame = () => {
    tick();
    frameId = requestAnimationFrame(frame);
  };

  const sync = () => {
    const shouldRun = onScreen && !document.hidden && !reduceMotion.matches;
    if (shouldRun && !running) {
      running = true;
      frameId = requestAnimationFrame(frame);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(frameId);
    }
  };

  tick();

  const observer = new IntersectionObserver(entries => {
    onScreen = entries[entries.length - 1].isIntersecting;
    sync();
  });
  observer.observe(element);
  document.addEventListener('visibilitychange', sync);
  reduceMotion.addEventListener('change', sync);

  return () => {
    running = false;
    cancelAnimationFrame(frameId);
    observer.disconnect();
    document.removeEventListener('visibilitychange', sync);
    reduceMotion.removeEventListener('change', sync);
  };
}
