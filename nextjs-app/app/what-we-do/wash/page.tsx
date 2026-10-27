import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';
import SitePage from '@/components/SitePage';
import { getPageMetadata, getSitePage } from '@/lib/site-content';

const content = PILLARS.wash;

const fallbackMetadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export const generateMetadata = () => getPageMetadata('wash', fallbackMetadata);

export default async function WashPage() {
  const page = await getSitePage('wash');
  if (page) return <SitePage doc={page} />;
  return <PillarPageContent content={content} />;
}
