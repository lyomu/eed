import type { Metadata } from 'next';
import Link from 'next/link';
import TeamSection from '@/components/team/TeamSection';
import FallbackImage from '@/components/FallbackImage';

export const metadata: Metadata = {
  title: 'Our Team — EED Research Institute',
  description:
    'A multidisciplinary collective of researchers, scientists, and strategists advancing sustainable ecological solutions.',
};

export default function TeamPage() {
  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-team.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">Our People</span>
            <h1>The people behind the research</h1>
            <p className="lead">
              A multidisciplinary collective of researchers, scientists, and strategists dedicated
              to advancing sustainable ecological solutions and rigorous academic inquiry.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="section-tight on-paper">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div>
              <h2>Join our research collective</h2>
              <p>
                We are always looking for rigorous thinkers and passionate environmental advocates
                to contribute to our ongoing studies.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
