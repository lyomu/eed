import type { Metadata } from 'next';
import PillarPageContent from '@/components/pillars/PillarPageContent';
import { PILLARS } from '@/lib/pillars-data';

const content = PILLARS.energy;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function EnergyPage() {
  return <PillarPageContent content={content} />;
}
