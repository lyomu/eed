import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';

const content = PILLARS.agriculture;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function AgriculturePage() {
  return <PillarPageContent content={content} />;
}
