'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { NAV_CTA, NAV_LINKS, PILLAR_LINKS, isActive, isActiveParent } from '@/lib/nav';

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const hasSubRef = useRef<HTMLLIElement | null>(null);
  const subToggleRef = useRef<HTMLButtonElement | null>(null);

  // Close the mobile menu and the submenu whenever the route changes, so a
  // link click doesn't leave either panel open on the next page. Adjusting
  // state during render (rather than in an effect) avoids an extra
  // post-navigation paint with the old panel still open.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setNavOpen(false);
    setSubOpen(false);
  }

  // initNavSubmenu: outside click closes the submenu.
  useEffect(() => {
    if (!subOpen) return;
    function onDocClick(e: MouseEvent) {
      if (hasSubRef.current && !hasSubRef.current.contains(e.target as Node)) {
        setSubOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [subOpen]);

  function onSubFocusOut(e: FocusEvent<HTMLLIElement>) {
    const related = e.relatedTarget as Node | null;
    // A null relatedTarget means focus left the document/window entirely
    // (switching apps, browser chrome) — that must not collapse the menu.
    if (!related) return;
    if (hasSubRef.current?.contains(related)) return;
    setSubOpen(false);
  }

  function onSubKeyDown(e: KeyboardEvent<HTMLLIElement>) {
    if (e.key !== 'Escape') return;
    setSubOpen(false);
    subToggleRef.current?.focus();
  }

  return (
    <header className="site-header">
      <div className="nav-bar">
        <Link href="/" className="brand">
          <img src="/assets/logo/eri-logo-mark.png" alt="EED Research Institute" />
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-list${navOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => {
            if (link.href === '/what-we-do') {
              return (
                <li
                  key={link.href}
                  className={`has-sub${subOpen ? ' open' : ''}`}
                  ref={hasSubRef}
                  onBlur={onSubFocusOut}
                  onKeyDown={onSubKeyDown}
                >
                  <Link
                    href={link.href}
                    className={isActiveParent(pathname, link.href) ? 'active-parent' : undefined}
                  >
                    {link.label}
                  </Link>
                  <button
                    ref={subToggleRef}
                    className="nav-sub-toggle"
                    aria-expanded={subOpen}
                    aria-controls="sub-wwd"
                    aria-label="Show research pillars"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubOpen((v) => !v);
                    }}
                  >
                    <svg viewBox="0 0 10 6" aria-hidden="true" focusable="false">
                      <path
                        d="M1 1l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <ul className="nav-sub" id="sub-wwd">
                    {PILLAR_LINKS.map((pillar) => (
                      <li key={pillar.href}>
                        <Link
                          href={pillar.href}
                          className={isActive(pathname, pillar.href) ? 'active' : undefined}
                          aria-current={isActive(pathname, pillar.href) ? 'page' : undefined}
                        >
                          {pillar.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(pathname, link.href) ? 'active' : undefined}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={NAV_CTA.href}
              className={`nav-cta${isActive(pathname, NAV_CTA.href) ? ' active' : ''}`}
              aria-current={isActive(pathname, NAV_CTA.href) ? 'page' : undefined}
            >
              {NAV_CTA.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
