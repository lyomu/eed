import type { Metadata } from 'next';
import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';

export const metadata: Metadata = {
  title: 'About Us — EED Research Institute',
  description:
    'EED Research Institute is dedicated to pioneering ecological breakthroughs that inform policy and empower communities across the globe.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-about.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">The Institute</span>
            <h1>Bridging Science and Sustainability.</h1>
            <p className="lead">
              The EED Research Institute is dedicated to pioneering ecological breakthroughs that
              inform policy and empower communities across the globe.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Fieldwork across East and Sub-Saharan Africa</h2>
            <p className="lead">
              Applied research grounded in the communities and institutions our findings are
              meant to serve.
            </p>
          </div>
          <div className="artistic-fieldwork-grid" data-reveal-stagger>
            <Link href="/what-we-do/wash" className="fieldwork-card">
              <img src="/assets/about/wash-field.jpg" alt="WASH Fieldwork" />
              <div className="card-overlay">
                <h3>WASH</h3>
              </div>
            </Link>
            <Link href="/what-we-do/energy" className="fieldwork-card">
              <img src="/assets/about/energy-field.jpg" alt="Energy Fieldwork" />
              <div className="card-overlay">
                <h3>Energy</h3>
              </div>
            </Link>
            <Link href="/what-we-do/climate" className="fieldwork-card">
              <img src="/assets/about/climate-field.jpg" alt="Climate Fieldwork" />
              <div className="card-overlay">
                <h3>Climate</h3>
              </div>
            </Link>
            <Link href="/what-we-do/agriculture" className="fieldwork-card">
              <img src="/assets/about/agriculture-field.jpg" alt="Agriculture Fieldwork" />
              <div className="card-overlay">
                <h3>Agriculture</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section on-sunk" id="thematic-areas">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Four pillars, one interconnected mission</h2>
            <p className="lead">
              Our core thematic areas bring together empirical research, institutional analysis,
              and localized action.
            </p>
          </div>

          <div className="artistic-pillar-grid" data-reveal-stagger>
            <div className="artistic-pillar-card">
              <div className="artistic-pillar-media">
                <img src="/assets/about/wash-pillar.jpg" alt="WASH Pillar" />
                <span className="media-badge">WASH</span>
                <span className="stat-chip">961M Access Gained</span>
              </div>
              <div className="artistic-pillar-body">
                <div className="artistic-pillar-head">
                  <h3>Water &amp; Sanitation</h3>
                  <span className="artistic-pillar-num">01</span>
                </div>
                <p>
                  According to the 2026 UN SDG 6 Synthesis Report, over 961 million people gained
                  access to safely managed drinking water over the past decade. Our WASH research
                  focuses on water security, sanitation governance, and building resilient water
                  systems.
                </p>
                <Link href="/what-we-do/wash" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </div>

            <div className="artistic-pillar-card">
              <div className="artistic-pillar-media">
                <img src="/assets/about/energy-pillar.jpg" alt="Energy Pillar" />
                <span className="media-badge">Energy</span>
                <span className="stat-chip">+19.5% Efficiency</span>
              </div>
              <div className="artistic-pillar-body">
                <div className="artistic-pillar-head">
                  <h3>Clean Energy</h3>
                  <span className="artistic-pillar-num">02</span>
                </div>
                <p>
                  Targeting universal energy access (SDG 7), addressing the 900 million gap in
                  clean cooking access across Africa, and driving water-energy nexus efficiency
                  gains across industrial and rural mini-grid systems.
                </p>
                <Link href="/what-we-do/energy" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </div>

            <div className="artistic-pillar-card">
              <div className="artistic-pillar-media">
                <img src="/assets/about/climate-pillar.jpg" alt="Climate Pillar" />
                <span className="media-badge">Climate</span>
                <span className="stat-chip">18% Water Stress</span>
              </div>
              <div className="artistic-pillar-body">
                <div className="artistic-pillar-head">
                  <h3>Climate Resilience</h3>
                  <span className="artistic-pillar-num">03</span>
                </div>
                <p>
                  Tracking climate variability impacts across vulnerable landscapes, evaluating
                  transboundary water management (59% coverage), and advancing localized climate
                  adaptation and climate finance mechanisms.
                </p>
                <Link href="/what-we-do/climate" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </div>

            <div className="artistic-pillar-card">
              <div className="artistic-pillar-media">
                <img src="/assets/about/agriculture-pillar.jpg" alt="Agriculture Pillar" />
                <span className="media-badge">Agriculture</span>
                <span className="stat-chip">6% Irrigated Farmland</span>
              </div>
              <div className="artistic-pillar-body">
                <div className="artistic-pillar-head">
                  <h3>Agriculture &amp; Food</h3>
                  <span className="artistic-pillar-num">04</span>
                </div>
                <p>
                  Empowering sub-Saharan Africa&rsquo;s 33 million smallholders where 60% of the
                  population relies on agriculture. We focus on micro-irrigation, water quality
                  monitoring, and sustainable food value chains.
                </p>
                <Link href="/what-we-do/agriculture" className="artistic-pillar-link">
                  Explore Pillar &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-paper" id="how-we-work">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>How we work</h2>
            <p className="lead">
              Four organizational competencies cut across every thematic area, from the evidence
              base through to implementation.
            </p>
          </div>

          <div className="artistic-work-grid" data-reveal-stagger>
            <div className="work-card">
              <div className="work-card-head">
                <span className="work-card-num">01</span>
                <h3>Integrated Systems Modeling &amp; Data Analytics</h3>
              </div>
              <p>
                We apply advanced geospatial mapping, AI-driven predictive models, and integrated
                resource nexus frameworks (Water-Energy-Food-Climate) to underpin every sector. We
                generate the granular, open-source evidence base required for scenario-testing,
                trade-off analysis, and strategic planning.
              </p>
            </div>

            <div className="work-card">
              <div className="work-card-head">
                <span className="work-card-num">02</span>
                <h3>Policy Architecture &amp; Institutional Capacity</h3>
              </div>
              <p>
                We translate technical evidence into actionable, enforceable frameworks. Our
                approach co-designs regulatory roadmaps, tariff structures, accountability
                mechanisms, and inter-ministerial coordination protocols across all sectors.
              </p>
            </div>

            <div className="work-card">
              <div className="work-card-head">
                <span className="work-card-num">03</span>
                <h3>Blended Finance &amp; Market Systems</h3>
              </div>
              <p>
                We bridge the gap between public mandates and private capital by structuring
                blended-finance vehicles, results-based financing (RBF), carbon/water credit
                mechanisms, and risk-mitigation instruments (guarantees, insurance).
              </p>
            </div>

            <div className="work-card">
              <div className="work-card-head">
                <span className="work-card-num">04</span>
                <h3>Human-Centered Design &amp; Adaptive Management</h3>
              </div>
              <p>
                We place end-users, vulnerable groups, and local communities at the core of every
                intervention. Using participatory co-creation, behavioral diagnostics, and
                gender-disaggregated data, we design solutions that are culturally appropriate and
                socially inclusive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-band">
        <div className="container">
          <h2 className="band-title">Institute Milestones</h2>
          <div className="timeline" data-reveal-stagger>
            <div className="timeline-item">
              <span className="year">2023</span>
              <h3>Founded</h3>
              <p>
                EED Research Institute is established with a mandate to advance evidence-based
                research across WASH, energy, climate, and agriculture.
              </p>
            </div>
            <div className="timeline-item">
              <span className="year">2024</span>
              <h3>First facility grants</h3>
              <p>
                First Kawisafi Technical Assistance Facility (TAF) grants disbursed; 150+ ongoing
                research initiatives launched across the region.
              </p>
            </div>
            <div className="timeline-item">
              <span className="year">2025 &mdash; Today</span>
              <h3>Active in 47 countries</h3>
              <p>
                Four key thematic pillars anchor our work across WASH, energy, climate and
                agriculture, supported by a growing multidisciplinary team of researchers,
                scientists, and strategists.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div>
              <h2>Become a Partner</h2>
              <p>
                We collaborate with organizations, institutions, and changemakers to accelerate
                sustainable solutions through research, innovation, and shared action. Join us in
                shaping a more sustainable future.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
