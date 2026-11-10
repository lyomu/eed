import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';
import SitePage from '@/components/SitePage';
import { getPageMetadata, getSitePage } from '@/lib/site-content';

const content = PILLARS.climate;

const fallbackMetadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export const generateMetadata = () => getPageMetadata('climate', fallbackMetadata);

export default async function ClimatePage() {
  const page = await getSitePage('climate');
  if (page) return <SitePage doc={page} />;
  return <PillarPageContent content={content} />;
}
