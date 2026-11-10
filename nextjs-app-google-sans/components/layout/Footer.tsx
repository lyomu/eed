'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';
import { PILLAR_LINKS, type NavLink } from '@/lib/nav';

const DEFAULT_QUICK_LINKS: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Our Team', href: '/team' },
  { label: 'Our Publications', href: '/portfolio' },
  { label: 'Contact Us', href: '/contact' },
];
const DEFAULT_INFO_LINKS: NavLink[] = [
  { label: 'FAQs', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Disclaimer', href: '#' },
];
const DEFAULT_LEGAL_LINKS: NavLink[] = [
  { label: 'Terms And Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer({ logo = '/assets/logo/eri-logo-full.png', description = 'EED Research Institute is committed to advancing scientific inquiry to address the global challenges in the fields of WASH, energy, climate change and agriculture.', quickLinks = DEFAULT_QUICK_LINKS, pillars = PILLAR_LINKS, infoLinks = DEFAULT_INFO_LINKS, legalLinks = DEFAULT_LEGAL_LINKS, copyright = '© 2026 EED Research Institute. All rights reserved.' }: {
  logo?: string; description?: string; quickLinks?: NavLink[]; pillars?: NavLink[];
  infoLinks?: NavLink[]; legalLinks?: NavLink[]; copyright?: string;
}) {
  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="EED Research Institute" />
            <p>{description}</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Our Pillars</h3>
            <ul>
              {pillars.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Information</h3>
            <ul>
              {infoLinks.map((link) => <li key={`${link.href}-${link.label}`}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            {legalLinks.map((link) => <Link key={`${link.href}-${link.label}`} href={link.href}>{link.label}</Link>)}
            <span>{copyright}</span>
          </div>
          <button id="back-to-top" onClick={backToTop}>
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
