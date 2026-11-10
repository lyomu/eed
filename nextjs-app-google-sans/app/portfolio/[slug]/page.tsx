import { notFound, redirect } from 'next/navigation';
import { getPublication } from '@/lib/cms';

/**
 * Portfolio entries live on their publishers' sites, so there is no detail
 * page on ours. This route only keeps old /portfolio/<slug> links working by
 * sending them to the published source.
 */
export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) notFound();
  redirect(pub.url || '/portfolio');
}
