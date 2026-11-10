'use client';

import { preload } from 'react-dom';
import type { CSSProperties } from 'react';

const WIDTHS = [1280, 1920, 2560];
const SIZES = '100vw';

/**
 * Responsive sources for a banner photo:
 * - bundled /assets/hero/<name>.jpg -> the WebP copies made by
 *   scripts/optimize-hero-images.mjs
 * - Prismic (imgix) URLs -> the same image resized by Prismic's CDN
 */
export function heroSrcSet(src: string): string | undefined {
  const local = src.match(/^(\/assets\/hero\/[^?]+)\.jpe?g(\?.*)?$/i);
  if (local) return WIDTHS.map((w) => `${local[1]}-${w}.webp ${w}w`).join(', ');
  if (src.startsWith('https://images.prismic.io/')) {
    return WIDTHS.map((w) => {
      const url = new URL(src);
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('w', String(w));
      return `${url.toString()} ${w}w`;
    }).join(', ');
  }
  return undefined;
}

/**
 * Full-bleed banner image. Serves a screen-sized WebP instead of the full
 * JPEG and, for the first banner on a page, preloads it from <head> so the
 * download starts before the page's scripts and styles finish. Removes
 * itself if the image fails, leaving the banner's gradient.
 */
export default function HeroImage({
  src,
  className = 'hero-bg',
  priority = true,
  style,
}: {
  src: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const srcSet = heroSrcSet(src);
  if (priority) {
    preload(src, { as: 'image', fetchPriority: 'high', imageSrcSet: srcSet, imageSizes: srcSet ? SIZES : undefined });
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? SIZES : undefined}
      alt=""
      style={style}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      onError={(e) => e.currentTarget.remove()}
    />
  );
}
