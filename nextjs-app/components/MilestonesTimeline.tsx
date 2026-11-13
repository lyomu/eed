import { MILESTONES } from '@/lib/milestones';

/**
 * Vertical timeline of the institute's milestones and assignments. Cards
 * alternate either side of a centre line on wide screens and stack beside a
 * left-hand line on narrow ones. Year headings sit on the line.
 */
export default function MilestonesTimeline() {
  let side = 0;
  return (
    <ol className="mtl">
      {MILESTONES.map((item, index) => {
        const showYear = index === 0 || MILESTONES[index - 1].group !== item.group;
        const position = side++ % 2 === 0 ? 'is-left' : 'is-right';
        return (
          <li key={`${item.period}-${item.title}`} className="mtl-entry">
            {showYear && (
              <div className="mtl-year" aria-hidden="true" data-reveal>
                <span>{item.group}</span>
              </div>
            )}
            <div className={`mtl-item ${position}`} data-reveal>
              <article className="mtl-card">
                {item.period !== item.group && <span className="mtl-period">{item.period}</span>}
                <h3>{item.title}</h3>
                {item.client && <p className="mtl-client">{item.client}</p>}
                <p className="mtl-body">{item.body}</p>
                {item.places && (
                  <ul className="mtl-places" aria-label="Where">
                    {item.places.map((place) => (
                      <li key={place}>{place}</li>
                    ))}
                  </ul>
                )}
              </article>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
