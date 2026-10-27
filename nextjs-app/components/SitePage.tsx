import * as prismic from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';
import ContactForm from '@/components/forms/ContactForm';
import InquiryForm from '@/components/forms/InquiryForm';
import TeamSection from '@/components/team/TeamSection';
import NewsIndexClient from '@/app/news/NewsIndexClient';
import PortfolioIndexClient from '@/app/portfolio/PortfolioIndexClient';
import { getBlogPosts, getPublications } from '@/lib/cms';
import type { TeamMember } from '@/lib/team-data';
import { linkResolver } from '@/lib/prismicio';
import { Fragment } from 'react';

// Prismic custom types are deliberately kept as JSON so editors can manage
// their models without a generated type file. The boundary is this renderer.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = any;

function value(field: Content): string {
  if (typeof field === 'string') return field;
  if (Array.isArray(field) && field.length) return prismic.asText(field as prismic.RichTextField) || '';
  return '';
}

function href(field: Content, fallback = '#'): string {
  if (field?.link_type === 'Document' && field?.type === 'site_page') return linkResolver(field);
  return prismic.asLink(field) || fallback;
}

function imageUrl(field: Content, fallback = ''): string {
  return field?.url || fallback;
}

function Rich({ field }: { field: Content }) {
  return Array.isArray(field) && field.length ? <PrismicRichText field={field as prismic.RichTextField} /> : null;
}

function Action({ label, destination, className = 'btn btn-primary' }: {
  label: string; destination: Content; className?: string;
}) {
  if (!label) return null;
  return <Link href={href(destination)} className={className}>{label}</Link>;
}

export default async function SitePage({ doc }: { doc: Content }) {
  const slices: Content[] = doc.data.slices || [];
  const needsNews = slices.some((slice) => slice.slice_type === 'news_list');
  const needsPublications = slices.some((slice) => slice.slice_type === 'publication_list');
  const [posts, publications] = await Promise.all([
    needsNews ? getBlogPosts() : Promise.resolve([]),
    needsPublications ? getPublications() : Promise.resolve([]),
  ]);

  return <>{slices.map((slice, index) => {
    const p = slice.primary || {};
    const items: Content[] = p.entries || slice.items || [];
    const key = slice.id || index;
    switch (slice.slice_type) {
      case 'hero':
        return <section key={key} className={`${p.home_style ? 'hero hero--image' : 'page-head page-head--image'} on-image`}>
          {(p.image?.url || p.home_style) && <FallbackImage className="hero-bg" src={imageUrl(p.image, '/assets/hero/hero-home.jpg')} alt="" fetchPriority={index === 0 ? 'high' : undefined} />}
          <div className="container"><div className={p.home_style ? 'hero-grid' : undefined}><div className="hero-enter">
            {p.eyebrow && <span className="hero-kicker">{p.eyebrow}</span>}
            <h1>{value(p.heading)}</h1>
            <div className="lead"><Rich field={p.body} /></div>
            <Action label={p.button_label} destination={p.button_link} />
          </div>
          {p.home_style && p.metrics?.length > 0 && <aside className="hero-meta">{p.metrics.map((metric: Content, i: number) => <div className="hero-meta-item" key={i}><span className="hero-meta-value" data-count>{metric.value}</span><span className="hero-meta-key">{metric.label}</span></div>)}</aside>}
          </div></div>
          {p.home_style && p.tags?.length > 0 && <div className="container"><div className="hero-strip" data-reveal-stagger>{p.tags.map((tag: Content, i: number) => <span key={i}>{tag.label}</span>)}</div></div>}
        </section>;
      case 'text_image':
        return <section key={key} className="section on-paper"><div className="container">
          <div className="split split-narrow" data-reveal>
            <div className="photo-block ratio-4x3"><FallbackImage src={imageUrl(p.image)} alt={p.image?.alt || value(p.heading)} loading="lazy" />
              {p.image_label && <span className="mark">{p.image_label}</span>}</div>
            <div><h2>{value(p.heading)}</h2><Rich field={p.body} />
              <Action label={p.button_label} destination={p.button_link} className="btn btn-outline" /></div>
          </div>
        </div></section>;
      case 'text_columns':
        return <section key={key} className="section on-paper"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="split" data-reveal><div><Rich field={p.left_body} /></div><div><Rich field={p.right_body} /></div></div>
        </div></section>;
      case 'card_grid':
        return <section key={key} className={`section ${p.background === 'sunk' ? 'on-sunk' : 'on-paper'}`}><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className={p.columns === 'two' ? 'grid-2' : 'grid-3'} data-reveal-stagger>
            {items.map((item, i) => <article className="feature-block" key={i}>
              {item.image?.url && <div className="photo-block ratio-16x10"><FallbackImage src={item.image.url} alt={item.image.alt || item.title || ''} loading="lazy" />{item.label && <span className="mark">{item.label}</span>}</div>}
              <h3>{item.title}</h3><Rich field={item.body} />
              <Action label={item.button_label} destination={item.button_link} className="card-link" />
            </article>)}
          </div>
        </div></section>;
      case 'link_list':
        return <section key={key} className="section on-paper"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="index-list" data-reveal-stagger>{items.map((item, i) => <div className="index-row pillar-row" key={i}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><Rich field={item.body} /></div>
            <div className="actions"><Action label={item.button_label || 'Explore →'} destination={item.button_link} className="card-link" /></div>
          </div>)}</div>
        </div></section>;
      case 'stats':
        return <section key={key} className="impact-band"><div className="container">{value(p.heading) && <h2 className="band-title">{value(p.heading)}</h2>}<div className="stats-grid" data-reveal-stagger>
          {items.map((item, i) => <div className="stat" key={i}><div className="stat-num" data-count>{item.value}</div><div className="stat-label">{item.label}</div></div>)}
        </div></div></section>;
      case 'image_link_grid':
        return <section key={key} className="section-tight on-paper"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="artistic-fieldwork-grid" data-reveal-stagger>{items.map((item, i) => <Link href={href(item.destination)} className="fieldwork-card" key={i}>
            <FallbackImage src={imageUrl(item.image)} alt={item.image?.alt || item.title || ''} loading="lazy" /><div className="card-overlay"><h3>{item.title}</h3></div>
          </Link>)}</div>
        </div></section>;
      case 'pillar_cards':
        return <section key={key} className="section on-sunk"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="artistic-pillar-grid" data-reveal-stagger>{items.map((item, i) => <div className="artistic-pillar-card" key={i}>
            <div className="artistic-pillar-media"><FallbackImage src={imageUrl(item.image)} alt={item.image?.alt || item.title || ''} loading="lazy" />
              {item.badge && <span className="media-badge">{item.badge}</span>}{item.stat && <span className="stat-chip">{item.stat}</span>}</div>
            <div className="artistic-pillar-body"><div className="artistic-pillar-head"><h3>{item.title}</h3><span className="artistic-pillar-num">{String(i + 1).padStart(2, '0')}</span></div>
              <Rich field={item.body} /><Link href={href(item.destination)} className="artistic-pillar-link">Explore Pillar →</Link></div>
          </div>)}</div>
        </div></section>;
      case 'work_cards':
        return <section key={key} className="section on-paper"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="artistic-work-grid" data-reveal-stagger>{items.map((item, i) => <div className="work-card" key={i}>
            <div className="work-card-head"><span className="work-card-num">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3></div><Rich field={item.body} />
          </div>)}</div>
        </div></section>;
      case 'timeline':
        return <section key={key} className="impact-band"><div className="container"><h2 className="band-title">{value(p.heading)}</h2>
          <div className="timeline" data-reveal-stagger>{items.map((item, i) => <div className="timeline-item" key={i}>
            <span className="year">{item.year}</span><h3>{item.title}</h3><Rich field={item.body} />
          </div>)}</div>
        </div></section>;
      case 'pillar_accordion':
        return <section key={key} className="section on-paper"><div className="container">
          <div className="section-head" data-rule data-reveal><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.intro} /></div></div>
          <div className="pillar-accordion" data-reveal>{items.map((item, i) => <Fragment key={i}>
            <input type="radio" name={`pillar-panel-${key}`} id={`pillar-panel-${key}-${i}`} className="pillar-panel-input" defaultChecked={i === 0} />
            <label htmlFor={`pillar-panel-${key}-${i}`} className="pillar-panel" style={{ backgroundImage: `url('${imageUrl(item.image)}')` }}>
              <span className="pillar-panel-tab">{item.title}</span><div className="pillar-panel-detail"><h3>{item.title}</h3><Rich field={item.body} />
                <Link href={href(item.destination)} className="artistic-pillar-link">Explore Pillar →</Link></div>
            </label>
          </Fragment>)}</div>
        </div></section>;
      case 'quote':
        return <section key={key} className="breaker on-image">
          {p.image?.url && <FallbackImage className="hero-bg" src={p.image.url} alt="" loading="lazy" />}
          <div className="container"><h2 data-reveal>{value(p.heading)}</h2></div>
        </section>;
      case 'call_to_action':
        return <section key={key} className="section-tight on-paper"><div className="container"><div className="cta-band" data-reveal>
          <div><h2>{value(p.heading)}</h2><Rich field={p.body} /></div>
          <Action label={p.button_label} destination={p.button_link} />
        </div></div></section>;
      case 'contact':
        return <section key={key} className="section on-paper"><div className="container"><div className="contact-grid" data-reveal>
          <div className="form-panel"><h2 className="panel-title">{value(p.heading) || 'Send us a message'}</h2><ContactForm /></div>
          <div className="office-panel"><h2>{p.office_heading || 'Find us'}</h2><Rich field={p.body} />
            {p.address && <div className="office-item"><span className="lbl">Address</span><address>{p.address}</address></div>}
            {p.phone && <div className="office-item"><span className="lbl">Telephone</span><address><a href={`tel:${p.phone.replace(/[^+\d]/g, '')}`}>{p.phone}</a></address></div>}
            {p.email && <div className="office-item"><span className="lbl">Email</span><address><a href={`mailto:${p.email}`}>{p.email}</a></address></div>}
          </div>
        </div></div></section>;
      case 'inquiry':
        return <section key={key} className="section on-sunk"><div className="container"><div className="split" data-reveal>
          <div><h2>{value(p.heading)}</h2><div className="lead"><Rich field={p.body} /></div></div>
          <div className="form-panel"><InquiryForm /></div>
        </div></div></section>;
      case 'team': {
        const members: TeamMember[] = items.filter((item) => item.name).map((item) => ({
          id: item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          initials: item.initials || item.name.split(' ').map((part: string) => part[0]).join('').slice(0, 2),
          name: item.name, role: item.role || '', photo: imageUrl(item.photo),
          linkedin: href(item.linkedin, '') || undefined, scholar: href(item.scholar, '') || undefined,
          bio: Array.isArray(item.bio) ? item.bio.filter((node: Content) => node.type === 'paragraph').map((node: Content) => node.text) : [],
        }));
        return <TeamSection key={key} members={members} />;
      }
      case 'news_list':
        return <NewsIndexClient key={key} posts={posts} />;
      case 'publication_list':
        return <PortfolioIndexClient key={key} publications={publications} />;
      default:
        return null;
    }
  })}</>;
}
