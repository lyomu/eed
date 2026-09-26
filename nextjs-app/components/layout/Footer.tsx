'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

export default function Footer() {
  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/assets/logo/eri-logo-full.png" alt="EED Research Institute" />
            <p>
              EED Research Institute is committed to advancing scientific inquiry to address the
              global challenges in the fields of WASH, energy, climate change and agriculture.
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/what-we-do">What We Do</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/portfolio">Our Publications</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Our Pillars</h3>
            <ul>
              <li><Link href="/what-we-do/wash">WASH</Link></li>
              <li><Link href="/what-we-do/energy">Energy</Link></li>
              <li><Link href="/what-we-do/climate">Climate</Link></li>
              <li><Link href="/what-we-do/agriculture">Agriculture</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Information</h3>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#">Terms And Conditions</a>
            <a href="#">Privacy Policy</a>
            <span>&copy; 2026 EED Research Institute. All rights reserved.</span>
          </div>
          <button id="back-to-top" onClick={backToTop}>
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
