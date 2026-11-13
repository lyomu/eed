'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MS_PER_CHAR = 28;

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Headline that types itself out the first time it scrolls into view.
 *
 * The full text is rendered on the server, so it is complete without
 * JavaScript and for crawlers. On the client it is reset before the first
 * paint and typed in. Characters not yet typed stay in the flow, hidden, so
 * the heading keeps its final size and nothing below it moves. Screen readers
 * get the whole sentence through aria-label, and visitors who prefer reduced
 * motion see the finished text straight away.
 */
export default function TypingHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [count, setCount] = useState(text.length);
  const [typing, setTyping] = useState(false);

  useIsoLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    setCount(0);
    setTyping(true);
  }, [text]);

  useEffect(() => {
    if (!typing) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        timer = setInterval(() => {
          const next = Math.min(text.length, Math.floor((performance.now() - start) / MS_PER_CHAR) + 1);
          setCount(next);
          if (next >= text.length) {
            clearInterval(timer);
            setTyping(false);
          }
        }, MS_PER_CHAR);
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [typing, text]);

  const waiting = typing && count === 0;
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {typing && !waiting && <span className="typing-caret" aria-hidden="true" />}
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        {text.slice(count)}
      </span>
    </h2>
  );
}
