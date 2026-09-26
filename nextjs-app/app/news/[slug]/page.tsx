import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/mock-content';
import { getBlogPost } from '@/lib/cms';
import PostBody from '@/components/blog/PostBody';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — EED Research Institute`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <div className="read-progress" role="presentation"></div>

      <section className="post-head">
        <div className="container">
          <div className="post-meta">
            <span className="tag">{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>{post.authorRole}</span>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="photo-block ratio-16x9 post-lead-image">
          <span className="mark">{post.leadImageLabel}</span>
        </div>
      </div>

      <div className="container">
        <div className="post-layout">
          <aside className="post-share">
            <span className="share-label">Share</span>
            <a href="#" aria-label="Share on social">&#8599;</a>
            <a href="#" aria-label="Share by email">&#9993;</a>
            <a href="#" aria-label="Save article">&#9733;</a>
          </aside>

          <article className="post-body">
            <PostBody body={post.body} />

            {post.references.length > 0 && (
              <section className="post-refs">
                <h2>References</h2>
                <ol>
                  {post.references.map((ref) => (
                    <li id={`ref-${ref.id}`} key={ref.id}>
                      {ref.text}
                      {ref.url && (
                        <>
                          {' '}
                          <a href={ref.url} rel="noopener noreferrer" target="_blank">
                            {ref.urlLabel ?? ref.url}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          <aside className="post-sidebar">
            {post.keyTakeaways.length > 0 && (
              <div className="side-card" data-reveal>
                <h3>Key Takeaways</h3>
                <ul>
                  {post.keyTakeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}
            {post.sidebarStats.map((stat) => (
              <div className="side-card side-stat" data-reveal key={stat.title}>
                <h3>{stat.title}</h3>
                <div className="figure" data-count>
                  {stat.value}
                </div>
                <p>{stat.body}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </>
  );
}
