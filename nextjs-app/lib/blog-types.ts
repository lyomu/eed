export type PillarCategory = 'energy' | 'wash' | 'climate' | 'agriculture';

export type PostBlock =
  | { type: 'lead'; text: string; opener?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'callout'; title: string; paragraphs: { term?: string; text: string }[] }
  | { type: 'figure'; caption: string; markLabel: string; imageUrl?: string; imageAlt?: string }
  | { type: 'signoff'; text: string };

export type Reference = { id: number; text: string; url?: string; urlLabel?: string };

export type SidebarStat = { title: string; value: string; body: string };

export type BlogPostSummary = {
  slug: string;
  title: string;
  category: string;
  categoryFilter: PillarCategory;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

export type BlogPost = BlogPostSummary & {
  author: string;
  authorRole: string;
  leadImageLabel: string;
  body: PostBlock[];
  keyTakeaways: string[];
  sidebarStats: SidebarStat[];
  references: Reference[];
};

export type PublicationCategory = PillarCategory | 'circular_economy';

export const PUBLICATION_AREAS: Record<PublicationCategory, string> = {
  energy: 'Energy',
  wash: 'WASH',
  climate: 'Climate Change',
  agriculture: 'Agriculture',
  circular_economy: 'Circular Economy',
};

/** A portfolio entry: a blurb that points readers to where the work is published. */
export type PublicationSummary = {
  slug: string;
  title: string;
  description: string;
  category: PublicationCategory;
  /** e.g. "Research paper", "Case study" */
  type: string;
  /** Outlet shown on the link, e.g. "ODI". */
  publisher: string;
  url?: string;
};

export type Publication = PublicationSummary;
