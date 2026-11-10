'use client';

import { useState } from 'react';
import FilterBar, { useFilterState } from '@/components/FilterBar';
import { PUBLICATION_AREAS, type PublicationSummary } from '@/lib/blog-types';

const TABS = [
  { value: 'all', label: 'All Research' },
  { value: 'energy', label: 'Energy' },
  { value: 'wash', label: 'WASH' },
  { value: 'climate', label: 'Climate' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'circular_economy', label: 'Circular Economy' },
];

/** Abstracts longer than this get clamped with a "Read full abstract" toggle. */
const CLAMP_CHARS = 320;

export default function PortfolioIndexClient({ publications }: { publications: PublicationSummary[] }) {
  const items = publications.map((pub) => ({
    ...pub,
    searchText: `${pub.title} ${pub.description} ${pub.type} ${pub.publisher} ${PUBLICATION_AREAS[pub.category] ?? ''}`,
  }));

  const { activeCategory, setActiveCategory, query, setQuery, filtered } = useFilterState(items);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  // Only offer tabs for areas that have at least one entry.
  const tabs = TABS.filter((tab) => tab.value === 'all' || publications.some((pub) => pub.category === tab.value));

  function toggle(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <section className="section-tight on-paper" data-filter-root="portfolio">
      <div className="container">
        <FilterBar
          tabs={tabs}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          query={query}
          onQueryChange={setQuery}
          searchId="portfolio-search"
          searchLabel="Search portfolio"
          searchPlaceholder="Search portfolio"
        />

        <div className="index-list" data-reveal-stagger>
          {filtered.map((pub) => {
            const long = pub.description.length > CLAMP_CHARS;
            const open = expanded.has(pub.slug);
            const abstractId = `abstract-${pub.slug}`;
            return (
              <article className="index-row pub-row" key={pub.slug}>
                <div>
                  <p className="pub-meta">
                    {[pub.type, PUBLICATION_AREAS[pub.category]].filter(Boolean).join(' · ')}
                  </p>
                  <h2>
                    {pub.url ? (
                      <a className="title" href={pub.url} target="_blank" rel="noopener noreferrer">
                        {pub.title}
                      </a>
                    ) : (
                      <span className="title">{pub.title}</span>
                    )}
                  </h2>
                  <p id={abstractId} className={`pub-abstract${long && !open ? ' is-clamped' : ''}`}>
                    {pub.description}
                  </p>
                  {long && (
                    <button
                      type="button"
                      className="pub-toggle"
                      aria-expanded={open}
                      aria-controls={abstractId}
                      onClick={() => toggle(pub.slug)}
                    >
                      {open ? 'Show less' : 'Read full abstract'}
                    </button>
                  )}
                </div>
                <div className="actions">
                  {pub.url && (
                    <a href={pub.url} className="btn btn-outline pub-source" target="_blank" rel="noopener noreferrer">
                      {pub.publisher ? `Read on ${pub.publisher}` : 'Read publication'}
                      <span aria-hidden="true"> &#8599;</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className={`empty-state${filtered.length ? ' hidden' : ''}`}>
          {publications.length ? 'No research matches your search.' : 'No research has been published yet.'}
        </p>
      </div>
    </section>
  );
}
