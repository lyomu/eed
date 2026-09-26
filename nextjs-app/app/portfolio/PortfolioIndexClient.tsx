'use client';

import { useState } from 'react';
import Link from 'next/link';
import FilterBar, { useFilterState } from '@/components/FilterBar';
import type { PublicationSummary } from '@/lib/blog-types';

const TABS = [
  { value: 'all', label: 'All Research' },
  { value: 'energy', label: 'Energy' },
  { value: 'wash', label: 'WASH' },
  { value: 'climate', label: 'Climate' },
  { value: 'agriculture', label: 'Agriculture' },
];

export default function PortfolioIndexClient({ publications }: { publications: PublicationSummary[] }) {
  const [loadMoreDone, setLoadMoreDone] = useState(false);

  const items = publications.map((pub) => ({
    ...pub,
    searchText: `${pub.title} ${pub.description} ${pub.funder} ${pub.tag}`,
  }));

  const { activeCategory, setActiveCategory, query, setQuery, filtered } = useFilterState(items);

  return (
    <section className="section-tight on-paper" data-filter-root="portfolio">
      <div className="container">
        <FilterBar
          tabs={TABS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          query={query}
          onQueryChange={setQuery}
          searchId="portfolio-search"
          searchLabel="Search portfolio"
          searchPlaceholder="Search portfolio"
        />

        <div className="index-list" data-reveal-stagger>
          {filtered.map((pub) => (
            <article className="index-row" key={pub.slug}>
              <div>
                <h2>{pub.title}</h2>
                <p>{pub.description}</p>
              </div>
              <div>
                <span className="meta">{pub.funder}</span>
                <br />
                <span className="tag">{pub.tag}</span>
              </div>
              <div className="actions">
                <Link href={`/portfolio/${pub.slug}`} className="card-link">
                  Read More &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={`empty-state${filtered.length ? ' hidden' : ''}`}>No projects match your search.</p>

        <div className="list-actions">
          <button
            className="btn btn-outline"
            id="load-more"
            disabled={loadMoreDone}
            onClick={() => setLoadMoreDone(true)}
          >
            {loadMoreDone ? 'All projects shown' : 'Load More Projects'}
          </button>
        </div>
      </div>
    </section>
  );
}
