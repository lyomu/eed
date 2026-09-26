'use client';

import { useMemo, useState } from 'react';

export type FilterTab = { value: string; label: string };

export type Filterable = { category: string; searchText: string };

export function useFilterState<T extends Filterable>(items: T[]) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery = !q || item.searchText.toLowerCase().indexOf(q) !== -1;
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, query]);

  return { activeCategory, setActiveCategory, query, setQuery, filtered };
}

export default function FilterBar({
  tabs,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  searchId,
  searchLabel,
  searchPlaceholder,
}: {
  tabs: FilterTab[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  searchId: string;
  searchLabel: string;
  searchPlaceholder: string;
}) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`filter-tab${activeCategory === tab.value ? ' active' : ''}`}
            onClick={() => onCategoryChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="filter-search">
        <label className="visually-hidden" htmlFor={searchId}>
          {searchLabel}
        </label>
        <input
          type="search"
          id={searchId}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
    </div>
  );
}
