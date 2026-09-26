export type PillarCategory = 'energy' | 'wash' | 'climate' | 'agriculture';

export type PostBlock =
  | { type: 'lead'; text: string; opener?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'callout'; title: string; paragraphs: { term?: string; text: string }[] }
  | { type: 'figure'; caption: string; markLabel: string }
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

export type PublicationSummary = {
  slug: string;
  title: string;
  description: string;
  funder: string;
  category: PillarCategory;
  tag: string;
};

export type Publication = PublicationSummary & {
  body: string[];
};
