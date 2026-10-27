import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/cms';
import NewsIndexClient from './NewsIndexClient';
import FallbackImage from '@/components/FallbackImage';
import SitePage from '@/components/SitePage';
import { getPageMetadata, getSitePage } from '@/lib/site-content';

const fallbackMetadata: Metadata = {
  title: 'News & Insights — EED Research Institute',
  description: 'Research commentary, policy analysis, and field perspectives from the EED Research Institute.',
};

export const generateMetadata = () => getPageMetadata('news', fallbackMetadata);

export default async function NewsPage() {
  const page = await getSitePage('news');
  if (page) return <SitePage doc={page} />;
  const posts = await getBlogPosts();

  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-news.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">Insights</span>
            <h1>Perspectives from the field</h1>
            <p className="lead">
              Research commentary, policy analysis, and field notes from our researchers across
              WASH, energy, climate, and agriculture.
            </p>
          </div>
        </div>
      </section>

      <NewsIndexClient posts={posts} />
    </>
  );
}
