import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PUBLICATIONS } from '@/lib/mock-content';
import { getPublication } from '@/lib/cms';

export async function generateStaticParams() {
  return PUBLICATIONS.map((pub) => ({ slug: pub.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) return {};
  return { title: `${pub.title} — EED Research Institute`, description: pub.description };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) notFound();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="meta-line">
            {pub.funder} &middot; {pub.tag}
          </span>
          <h1>{pub.title}</h1>
          <p className="lead">{pub.description}</p>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="split split-narrow">
            <div className="post-body">
              {pub.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <div className="side-card">
                <h3>Project details</h3>
                <ul>
                  <li>
                    <strong>Funder:</strong> {pub.funder}
                  </li>
                  <li>
                    <strong>Pillar:</strong> {pub.tag}
                  </li>
                </ul>
              </div>
              <Link href="/portfolio" className="card-link">
                &larr; Back to Research Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
