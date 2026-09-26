import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';

const content = PILLARS.climate;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function ClimatePage() {
  return <PillarPageContent content={content} />;
}
