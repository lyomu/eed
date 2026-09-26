import type { ReactNode } from 'react';
import type { PostBlock } from '@/lib/blog-types';

function renderWithCitations(text: string): ReactNode {
  const parts = text.split(/\{\{cite:(\d+)\}\}/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <sup key={i}>
        <a href={`#ref-${part}`} id={`cite-${part}`}>
          {part}
        </a>
      </sup>
    ) : (
      part
    )
  );
}

export default function PostBody({ body }: { body: PostBlock[] }) {
  return (
    <>
      {body.map((block, i) => {
        switch (block.type) {
          case 'lead':
            return (
              <p className="lead" key={i}>
                {block.opener && <span className="lead-opener">{block.opener}</span>}
                {block.opener ? ' ' : ''}
                {renderWithCitations(block.text)}
              </p>
            );
          case 'paragraph':
            return <p key={i}>{renderWithCitations(block.text)}</p>;
          case 'heading':
            return <h2 key={i}>{block.text}</h2>;
          case 'blockquote':
            return (
              <blockquote className="pull-quote" data-reveal key={i}>
                {block.text}
              </blockquote>
            );
          case 'callout':
            return (
              <aside className="callout" key={i}>
                <h3>{block.title}</h3>
                {block.paragraphs.map((p, j) => (
                  <p key={j}>
                    {p.term && <strong>{p.term}</strong>} {p.text}
                  </p>
                ))}
              </aside>
            );
          case 'figure':
            return (
              <figure className="post-figure" data-reveal key={i}>
                <div className="photo-block ratio-16x10">
                  <span className="mark">{block.markLabel}</span>
                </div>
                <figcaption>{block.caption}</figcaption>
              </figure>
            );
          case 'signoff':
            return (
              <p className="post-signoff" key={i}>
                {block.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
