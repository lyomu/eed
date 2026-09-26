'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';
import { runCount } from '@/lib/count-up';

const REVEAL_SELECTOR = '[data-reveal],[data-reveal-stagger],[data-rule]';

/**
 * Ports initReveal / initHero / initScrollFx from the original main.js.
 * These scan the page by data-attribute rather than owning a specific DOM
 * subtree, so they're mounted once here (not per-component) and re-run their
 * element queries on every route change, since Next.js doesn't reload the
 * DOM between pages the way the static site did between page loads.
 */
export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cleanups = [initReveal(reduced), initHero(reduced), initScrollFx(reduced)];
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}

function initReveal(reduced: boolean): () => void {
  // Children of [data-reveal-stagger] get an --i index so the per-item
  // delay maths can stay in CSS. Runs unconditionally, before any early exit.
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      (child as HTMLElement).style.setProperty('--i', String(Math.min(i, 8)));
    });
  });

  const items = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!items.length && !counters.length) return () => {};

  if (reduced || typeof IntersectionObserver === 'undefined') {
    items.forEach((el) => el.classList.add('in-view'));
    return () => {}; // counters keep their final text
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add('in-view');
        target.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => runCount(el, false));
        if (target.hasAttribute('data-count')) runCount(target, false);
        observer.unobserve(target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  items.forEach((el) => observer.observe(el));
  // Counters that sit outside any revealed container still need a trigger.
  counters.forEach((counter) => {
    if (!counter.closest(REVEAL_SELECTOR)) observer.observe(counter);
  });

  return () => observer.disconnect();
}

function initHero(reduced: boolean): () => void {
  const blocks = document.querySelectorAll<HTMLElement>('.on-image');
  if (!blocks.length) return () => {};

  const settleRaw = getComputedStyle(document.documentElement).getPropertyValue('--dur-settle');
  const settle = parseInt(settleRaw, 10) || 900;
  const timeouts: ReturnType<typeof setTimeout>[] = [];
  const rafs: number[] = [];

  function ready(el: HTMLElement) {
    el.classList.add('hero-ready');
    timeouts.push(setTimeout(() => el.classList.add('hero-settled'), settle + 40));
  }

  blocks.forEach((el) => {
    if (reduced) {
      el.classList.add('hero-ready', 'hero-settled');
      return;
    }
    // Double rAF guarantees a real starting frame before the transition.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => ready(el));
      rafs.push(raf2);
    });
    rafs.push(raf1);
  });

  return () => {
    timeouts.forEach(clearTimeout);
    rafs.forEach((id) => cancelAnimationFrame(id));
  };
}

function initScrollFx(reduced: boolean): () => void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const heroImg = document.querySelector<HTMLElement>('.hero--image .hero-bg');
  const hero = document.querySelector<HTMLElement>('.hero--image');
  const progress = document.querySelector<HTMLElement>('.read-progress');
  const article = document.querySelector<HTMLElement>('.post-body');

  if (!header && !heroImg && !progress) return () => {};

  const wide = window.matchMedia('(min-width: 900px)');
  let queued = false;
  let rafId: number | null = null;

  function update() {
    queued = false;
    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-stuck', y > 40);

    if (heroImg && hero && !reduced && wide.matches) {
      const h = hero.offsetHeight || 1;
      if (y < h) {
        heroImg.style.setProperty('--py', `${(y * 0.08).toFixed(1)}px`);
        heroImg.style.willChange = 'transform';
      } else if (heroImg.style.willChange) {
        heroImg.style.willChange = '';
      }
    }

    if (progress && article) {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total > 0 ? -rect.top / total : 1;
      progress.style.setProperty('--progress', Math.min(Math.max(done, 0), 1).toFixed(4));
    }
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    rafId = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}
