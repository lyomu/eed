import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';
import SitePage from '@/components/SitePage';
import { getPageMetadata, getSitePage } from '@/lib/site-content';

const content = PILLARS.energy;

const fallbackMetadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export const generateMetadata = () => getPageMetadata('energy', fallbackMetadata);

export default async function EnergyPage() {
  const page = await getSitePage('energy');
  if (page) return <SitePage doc={page} />;
  return <PillarPageContent content={content} />;
}
