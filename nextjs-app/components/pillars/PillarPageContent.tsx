import Link from 'next/link';
import type { PillarContent } from '@/lib/pillars-data';
import FallbackImage from '@/components/FallbackImage';

export default function PillarPageContent({ content }: { content: PillarContent }) {
  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src={content.heroImage}
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">&rsaquo;</span>
            <Link href="/what-we-do">What We Do</Link>
            <span className="sep" aria-hidden="true">&rsaquo;</span>
            <span className="current">{content.breadcrumbCurrent}</span>
          </nav>
          <div className="hero-enter">
            <h1>{content.h1}</h1>
            <p className="hero-tagline">{content.tagline}</p>
            <p className="lead">{content.lead}</p>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>Why this matters</h2>
            <p className="lead">{content.whyMattersLead}</p>
          </div>
          <div className="split" data-reveal>
            <div>
              {content.leftParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div>
              {content.rightParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="impact-band">
        <div className="container">
          <div className="stats-grid" data-reveal-stagger>
            {content.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat-num" data-count>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>What we work on</h2>
            <p className="lead">{content.focusLead}</p>
          </div>
          <div className="index-list" data-reveal-stagger>
            {content.focusAreas.map((area, i) => (
              <div className="index-row pillar-row" key={area.title}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </div>
                <div className="actions">
                  <span className="meta">{area.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-sunk">
        <div className="container">
          <div className="section-head" data-rule data-reveal>
            <h2>How we work</h2>
            <p className="lead">{content.approachLead}</p>
          </div>
          <div className="grid-3" data-reveal-stagger>
            {content.approachCards.map((card) => (
              <article className="feature-block" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight on-paper">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaBody}</p>
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
