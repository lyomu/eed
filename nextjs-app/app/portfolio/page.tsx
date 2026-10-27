import type { Metadata } from 'next';
import { getPublications } from '@/lib/cms';
import PortfolioIndexClient from './PortfolioIndexClient';
import FallbackImage from '@/components/FallbackImage';
import SitePage from '@/components/SitePage';
import { getPageMetadata, getSitePage } from '@/lib/site-content';

const fallbackMetadata: Metadata = {
  title: 'Research Portfolio — EED Research Institute',
  description:
    'An archive of applied research, systemic analyses, and policy interventions across WASH, energy, climate, and agriculture.',
};

export const generateMetadata = () => getPageMetadata('portfolio', fallbackMetadata);

export default async function PortfolioPage() {
  const page = await getSitePage('portfolio');
  if (page) return <SitePage doc={page} />;
  const publications = await getPublications();

  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-portfolio.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">Research Portfolio</span>
            <h1>An index of our applied research</h1>
            <p className="lead">
              Systemic analyses and policy interventions across key thematic areas, designed to
              foster ecological stewardship and intellectual rigor.
            </p>
          </div>
        </div>
      </section>

      <PortfolioIndexClient publications={publications} />
    </>
  );
}
