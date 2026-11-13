/** Partner organisations shown on the homepage. Logos live in public/assets/partners. */
const PARTNERS = [
  { name: 'Africa Policy Research Institute (APRI)', logo: 'apri.png', width: 737, height: 240 },
  { name: 'Loughborough University', logo: 'loughborough.png', width: 671, height: 170 },
  { name: 'Kabarak University', logo: 'kabarak.png', width: 224, height: 240 },
  { name: 'Amref Health Africa', logo: 'amref.png', width: 406, height: 240 },
  { name: 'EnergyCorps', logo: 'energycorps.svg', width: 692, height: 131 },
];

export default function PartnersSection() {
  return (
    <section className="section on-paper partners">
      <div className="container">
        <div className="section-head" data-rule data-reveal>
          <h2>Our Partners</h2>
          <p className="lead">
            We work alongside universities, research institutes and development organisations
            across Africa and beyond.
          </p>
        </div>
        <ul className="partner-grid" data-reveal-stagger>
          {PARTNERS.map((partner) => (
            <li key={partner.name} className="partner-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/partners/${partner.logo}`}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className={partner.width / partner.height < 1.3 ? 'is-square' : undefined}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
