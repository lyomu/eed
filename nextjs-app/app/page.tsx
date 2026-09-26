import Link from 'next/link';
import InquiryForm from '@/components/forms/InquiryForm';
import FallbackImage from '@/components/FallbackImage';

export default function HomePage() {
  return (
    <>
      <section className="hero hero--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-home.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-enter">
              <h1>Advancing Evidence-Based Sustainability</h1>
              <p className="lead">
                EED Research Institute is a multidisciplinary organization founded in 2023,
                committed to advancing scientific inquiry to address the complex global
                challenges in the fields of WASH, energy, climate change, and agriculture.
              </p>
              <Link href="/portfolio" className="btn btn-primary">
                Explore Research
              </Link>
            </div>
            <aside className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-value" data-count>2023</span>
                <span className="hero-meta-key">Established</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-value" data-count>47</span>
                <span className="hero-meta-key">Countries</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-value" data-count>04</span>
                <span className="hero-meta-key">Research Pillars</span>
              </div>
            </aside>
          </div>
        </div>
        <div className="container">
          <div className="hero-strip" data-reveal-stagger>
            <span>Water, Sanitation &amp; Hygiene</span>
            <span>Energy</span>
            <span>Climate Change</span>
            <span>Agriculture</span>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="split split-narrow" data-reveal>
            <div className="photo-block ratio-4x3">
              <FallbackImage
                src="/assets/about/field-research.jpg"
                alt="ERI Field Research"
                loading="lazy"
              />
              <span className="mark">ERI Field Research</span>
            </div>
            <div>
              <h2>A research institute built for interconnected challenges</h2>
              <p>
                EED Research Institute is a multidisciplinary organization founded in 2023 and
                committed to advancing scientific inquiry to address complex global challenges in
                WASH, energy, climate change, and agriculture.
              </p>
              <p>
                Its work focuses on impact- and mission-oriented research, knowledge exchange and
                translation, applied research and problem-solving, evidence-based policy support,
                technology development and innovation, standardization, certification and
                testing, and professional training.
              </p>
              <Link href="/about" className="btn btn-outline">
                About the Institute
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="breaker on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-portfolio.jpg"
          alt=""
          loading="lazy"
        />
        <div className="container">
          <h2 data-reveal>
            Transforming water, energy, climate and agriculture with rigorous, field-grounded
            research
          </h2>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Core Research Pillars</h2>
            <p className="lead">
              Four interconnected thematic areas anchor our research, policy engagement, and
              community partnerships.
            </p>
          </div>
          <div className="index-list" data-reveal-stagger>
            <div className="index-row pillar-row">
              <span className="num">01</span>
              <div>
                <h3>WASH</h3>
                <p>Water, Sanitation, and Hygiene strategies for resilient communities.</p>
              </div>
              <div className="actions">
                <Link href="/what-we-do/wash" className="card-link">
                  Explore &rarr;
                </Link>
              </div>
            </div>
            <div className="index-row pillar-row">
              <span className="num">02</span>
              <div>
                <h3>Energy</h3>
                <p>Transitional energy frameworks and renewable infrastructure planning.</p>
              </div>
              <div className="actions">
                <Link href="/what-we-do/energy" className="card-link">
                  Explore &rarr;
                </Link>
              </div>
            </div>
            <div className="index-row pillar-row">
              <span className="num">03</span>
              <div>
                <h3>Climate</h3>
                <p>Adaptation modeling and climate finance policy analysis.</p>
              </div>
              <div className="actions">
                <Link href="/what-we-do/climate" className="card-link">
                  Explore &rarr;
                </Link>
              </div>
            </div>
            <div className="index-row pillar-row">
              <span className="num">04</span>
              <div>
                <h3>Agriculture</h3>
                <p>Sustainable food systems and land-use optimization research.</p>
              </div>
              <div className="actions">
                <Link href="/what-we-do/agriculture" className="card-link">
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-sunk">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Recent flagship studies</h2>
            <p className="lead">
              In-depth studies driving sustainable transformation across critical sectors.
            </p>
          </div>
          <div className="grid-2" data-reveal-stagger>
            <article className="feature-block">
              <div className="photo-block ratio-16x10">
                <FallbackImage
                  src="/assets/research/water-resilience.jpg"
                  alt="Urban Water Resilience Index 2024"
                  loading="lazy"
                />
                <span className="mark">Water Infrastructure</span>
              </div>
              <h3>Urban Water Resilience Index 2024</h3>
              <p>
                A comprehensive analysis of water infrastructure stability in rapidly urbanizing
                regions.
              </p>
              <Link href="/portfolio" className="card-link">
                Learn More &rarr;
              </Link>
            </article>
            <article className="feature-block">
              <div className="photo-block ratio-16x10">
                <FallbackImage
                  src="/assets/research/rural-solar.jpg"
                  alt="Decentralized Solar for Rural Industry"
                  loading="lazy"
                />
                <span className="mark">Off-Grid Solar</span>
              </div>
              <h3>Decentralized Solar for Rural Industry</h3>
              <p>
                Evaluating the economic impact of off-grid renewable energy on local manufacturing
                hubs.
              </p>
              <Link href="/portfolio" className="card-link">
                Learn More &rarr;
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Latest Insights</h2>
            <p className="lead">Perspectives from our researchers on the ground.</p>
          </div>
          <div className="article-list" data-reveal-stagger>
            <article className="article-row">
              <div className="article-meta">
                <span className="cat">Energy Policy</span>
                <span>Oct 12, 2025</span>
              </div>
              <div>
                <h3>
                  <Link href="/news/future-of-solar-energy-east-africa">
                    The Future of Solar Energy in East Africa
                  </Link>
                </h3>
                <p>
                  How policy shifts are enabling a new era of energy independence across the Rift
                  Valley.
                </p>
              </div>
              <span className="read-time">8 min read</span>
            </article>
            <article className="article-row">
              <div className="article-meta">
                <span className="cat">WASH Security</span>
                <span>Sep 28, 2025</span>
              </div>
              <div>
                <h3>
                  <Link href="/news/wash-governance-in-arid-zones">WASH Governance in Arid Zones</Link>
                </h3>
                <p>
                  Exploring community-led management models for sustainable water security.
                </p>
              </div>
              <span className="read-time">10 min read</span>
            </article>
            <article className="article-row">
              <div className="article-meta">
                <span className="cat">Climate Finance</span>
                <span>Sep 09, 2025</span>
              </div>
              <div>
                <h3>
                  <Link href="/news/climate-finance-closing-the-gap">
                    Climate Finance: Closing the Gap
                  </Link>
                </h3>
                <p>Bridging the funding divide for localized adaptation projects in the Global South.</p>
              </div>
              <span className="read-time">12 min read</span>
            </article>
          </div>
          <div className="list-actions">
            <Link href="/news" className="btn btn-outline">
              View All Insights
            </Link>
          </div>
        </div>
      </section>

      <section className="section on-sunk">
        <div className="container">
          <div className="split" data-reveal>
            <div>
              <h2>Let&rsquo;s collaborate</h2>
              <p className="lead">
                Interested in collaborating or learning more about our research? Our team is
                ready to connect.
              </p>
              <dl className="detail-list">
                <div className="detail-item">
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:eri@eedadvisory.com">eri@eedadvisory.com</a>
                  </dd>
                </div>
                <div className="detail-item">
                  <dt>Location</dt>
                  <dd>50 Hamisi Road, Kileleshwa, Nairobi, Kenya</dd>
                </div>
              </dl>
            </div>
            <div className="form-panel">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
