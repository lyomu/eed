import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/cms';
import NewsIndexClient from './NewsIndexClient';
import FallbackImage from '@/components/FallbackImage';

export const metadata: Metadata = {
  title: 'News & Insights — EED Research Institute',
  description: 'Research commentary, policy analysis, and field perspectives from the EED Research Institute.',
};

export default async function NewsPage() {
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
