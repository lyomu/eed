export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Our Team', href: '/team' },
  { label: 'Research Portfolio', href: '/portfolio' },
  { label: 'Blogs', href: '/news' },
];

export const NAV_CTA: NavLink = { label: 'Contact Us', href: '/contact' };

export const PILLAR_LINKS: NavLink[] = [
  { label: 'WASH', href: '/what-we-do/wash' },
  { label: 'Energy', href: '/what-we-do/energy' },
  { label: 'Climate', href: '/what-we-do/climate' },
  { label: 'Agriculture', href: '/what-we-do/agriculture' },
];

/** Matches the exact-current-page link: '.active' + aria-current="page". */
export function isActive(pathname: string, href: string): boolean {
  return pathname === href;
}

/**
 * Marks the "What We Do" nav item as `.active-parent` (not `.active` —
 * that stays reserved for an exact match) whenever the current page is
 * itself or one of its nested pillar pages.
 */
export function isActiveParent(pathname: string, href: string): boolean {
  if (href !== '/what-we-do') return false;
  return pathname.startsWith('/what-we-do/');
}
