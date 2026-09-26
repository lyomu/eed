import type { Metadata } from 'next';
import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';

export const metadata: Metadata = {
  title: 'What We Do — EED Research Institute',
  description:
    'Discover the research initiatives, programs, and evidence-based solutions led by EED Research Institute.',
};

export default function WhatWeDoPage() {
  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-home.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">Our Work</span>
            <h1>What We Do</h1>
            <p className="lead">
              Advancing evidence-based solutions across WASH, energy, climate change, and
              agriculture.
            </p>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Four research pillars</h2>
            <p className="lead">
              Our work is organised around four thematic areas. They are deliberately
              interconnected &mdash; water security is an energy question, energy access is a
              climate question, and both determine whether agriculture is viable.
            </p>
          </div>
          <div className="pillar-accordion" data-reveal>
            <input type="radio" name="pillar-panel" id="panel-wash" className="pillar-panel-input" defaultChecked />
            <label
              htmlFor="panel-wash"
              className="pillar-panel"
              style={{ backgroundImage: "url('/assets/about/wash-pillar.jpg')" }}
            >
              <span className="pillar-panel-tab">WASH</span>
              <div className="pillar-panel-detail">
                <h3>WASH</h3>
                <p>
                  Water security, safely managed sanitation and hygiene behaviour &mdash; and the
                  governance arrangements that decide whether services still work years after they
                  are built.
                </p>
                <Link href="/what-we-do/wash" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </label>

            <input type="radio" name="pillar-panel" id="panel-energy" className="pillar-panel-input" />
            <label
              htmlFor="panel-energy"
              className="pillar-panel"
              style={{ backgroundImage: "url('/assets/about/energy-pillar.jpg')" }}
            >
              <span className="pillar-panel-tab">Energy</span>
              <div className="pillar-panel-detail">
                <h3>Energy</h3>
                <p>
                  Clean cooking transitions, energy access and mini-grids, energy and climate
                  finance, and the productive use of energy in enterprise.
                </p>
                <Link href="/what-we-do/energy" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </label>

            <input type="radio" name="pillar-panel" id="panel-climate" className="pillar-panel-input" />
            <label
              htmlFor="panel-climate"
              className="pillar-panel"
              style={{ backgroundImage: "url('/assets/about/climate-pillar.jpg')" }}
            >
              <span className="pillar-panel-tab">Climate</span>
              <div className="pillar-panel-detail">
                <h3>Climate</h3>
                <p>
                  Adaptation and resilience in water, energy and food systems, climate finance,
                  carbon markets and removals, and the alignment of climate with development
                  policy.
                </p>
                <Link href="/what-we-do/climate" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </label>

            <input type="radio" name="pillar-panel" id="panel-agriculture" className="pillar-panel-input" />
            <label
              htmlFor="panel-agriculture"
              className="pillar-panel"
              style={{ backgroundImage: "url('/assets/about/agriculture-pillar.jpg')" }}
            >
              <span className="pillar-panel-tab">Agriculture</span>
              <div className="pillar-panel-detail">
                <h3>Agriculture</h3>
                <p>
                  Smallholder productivity under climate risk, irrigation and water for
                  agriculture, land use, and the food systems and value chains that turn yield
                  into income.
                </p>
                <Link href="/what-we-do/agriculture" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </label>
          </div>
        </div>
      </section>

      <section className="section-tight on-paper">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div>
              <h2>Commission research with us</h2>
              <p>
                We work with governments, funders, utilities, investors and academic partners
                across all four pillars.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
