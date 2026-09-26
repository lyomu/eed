import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';

const content = PILLARS.wash;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function WashPage() {
  return <PillarPageContent content={content} />;
}
