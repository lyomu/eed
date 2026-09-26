'use client';

import type { ImgHTMLAttributes } from 'react';

/**
 * Decorative image that removes itself on error instead of showing a broken
 * image icon — ports the `onerror="this.remove()"` pattern from the
 * original static HTML. A plain <img> can't carry an event handler inside a
 * Server Component, so this small client wrapper exists purely for that.
 */
export default function FallbackImage({ alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...props} onError={(e) => e.currentTarget.remove()} />;
}
