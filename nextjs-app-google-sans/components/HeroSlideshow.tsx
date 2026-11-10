'use client';

import { useEffect, useState } from 'react';
import { preload } from 'react-dom';
import { heroSrcSet } from '@/components/HeroImage';

/** Homepage hero backgrounds, shown in order and cross-faded. */
export const HOME_HERO_SLIDES = [
  { src: '/assets/hero/hero-home-wind.jpg', position: 'center 55%' },
  { src: '/assets/hero/hero-home-solar.jpg', position: 'center 60%' },
];

const INTERVAL_MS = 7000;

/**
 * Cross-fading background for the homepage hero. Every slide carries the
 * `.hero-bg` class so it picks up the shared drift, settle and parallax
 * styling; only the active one is opaque. Slides after the first load lazily
 * so they never compete with the first paint.
 */
export default function HeroSlideshow({ slides = HOME_HERO_SLIDES }: { slides?: typeof HOME_HERO_SLIDES }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setActive((current) => {
        // Skip any slide whose image failed to load.
        for (let step = 1; step <= slides.length; step++) {
          const next = (current + step) % slides.length;
          if (!failed.has(next)) return next;
        }
        return current;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length, failed]);

  // Start the first slide's download from <head>, at a screen-sized width.
  const firstSrcSet = slides[0] ? heroSrcSet(slides[0].src) : undefined;
  if (slides[0]) {
    preload(slides[0].src, { as: 'image', fetchPriority: 'high', imageSrcSet: firstSrcSet, imageSizes: firstSrcSet ? '100vw' : undefined });
  }

  return (
    <>
      {slides.map((slide, i) =>
        failed.has(i) ? null : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            className={`hero-bg hero-slide${i === active ? ' is-active' : ''}`}
            src={slide.src}
            srcSet={heroSrcSet(slide.src)}
            sizes={heroSrcSet(slide.src) ? '100vw' : undefined}
            decoding="async"
            alt=""
            style={{ objectPosition: slide.position, animationDelay: `${i * -9}s` }}
            fetchPriority={i === 0 ? 'high' : undefined}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={() => setFailed((prev) => new Set(prev).add(i))}
          />
        ),
      )}
    </>
  );
}
