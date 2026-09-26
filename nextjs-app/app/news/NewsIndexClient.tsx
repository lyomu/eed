'use client';

import Link from 'next/link';
import FilterBar, { useFilterState } from '@/components/FilterBar';
import type { BlogPostSummary } from '@/lib/blog-types';

const TABS = [
  { value: 'all', label: 'All Blogs' },
  { value: 'climate', label: 'Climate Models' },
  { value: 'wash', label: 'WASH Security' },
  { value: 'energy', label: 'Energy Policy' },
  { value: 'agriculture', label: 'Agriculture' },
];

export default function NewsIndexClient({ posts }: { posts: BlogPostSummary[] }) {
  const featured = posts.find((p) => p.featured) ?? posts[0];

  const items = posts.map((post) => ({
    ...post,
    category: post.categoryFilter,
    searchText: `${post.title} ${post.excerpt} ${post.category} ${post.date} ${post.readTime}`,
  }));

  const { activeCategory, setActiveCategory, query, setQuery, filtered } = useFilterState(items);

  return (
    <>
      <section className="on-paper">
        <div className="container">
          <article className="featured-article" data-reveal>
            <Link href={`/news/${featured.slug}`} className="photo-block ratio-16x10">
              <span className="mark">{featured.category}</span>
            </Link>
            <div>
              <span className="meta-line">
                Featured &middot; {featured.category} &middot; {featured.date}
              </span>
              <h2>
                <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <Link href={`/news/${featured.slug}`} className="card-link">
                Read Full Report &rarr;
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-tight on-paper" data-filter-root="news">
        <div className="container">
          <FilterBar
            tabs={TABS}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            query={query}
            onQueryChange={setQuery}
            searchId="news-search"
            searchLabel="Search insights"
            searchPlaceholder="Search insights"
          />

          <div className="article-list" data-reveal-stagger>
            {filtered.map((post) => (
              <article className="article-row" key={post.slug}>
                <div className="article-meta">
                  <span className="cat">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <div>
                  <h3>
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="read-time">{post.readTime}</span>
              </article>
            ))}
          </div>

          <p className={`empty-state${filtered.length ? ' hidden' : ''}`}>No insights match your search.</p>

          <div className="pagination">
            <span className="current">1</span>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">&rsaquo;</a>
          </div>
        </div>
      </section>
    </>
  );
}
