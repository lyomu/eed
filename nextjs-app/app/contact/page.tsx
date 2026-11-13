import type { Metadata } from 'next';
import { Fragment } from 'react';
import ContactForm from '@/components/forms/ContactForm';
import HeroImage from '@/components/HeroImage';
import SitePage from '@/components/SitePage';
import SocialLinks from '@/components/SocialLinks';
import { getPageMetadata, getSitePage } from '@/lib/site-content';
import { CONTACT, CONTACT_PHONE_HREF } from '@/lib/contact-info';

const fallbackMetadata: Metadata = {
  title: 'Contact Us — EED Research Institute',
  description:
    'Collaborate with EED Research Institute. Reach our East Africa hub in Nairobi, Kenya, or submit a research inquiry.',
};

export const generateMetadata = () => getPageMetadata('contact', fallbackMetadata);

export default async function ContactPage() {
  const page = await getSitePage('contact');
  if (page) return <SitePage doc={page} />;
  return (
    <>
      <section className="page-head page-head--image on-image">
        <HeroImage src="/assets/hero/hero-contact.jpg" />
        <div className="container">
          <div className="hero-enter">
            <h1>Let&rsquo;s build the evidence base together</h1>
            <p className="lead">
              We welcome collaboration with academic institutions, government agencies, and
              private sector partners to drive evidence-based solutions for global challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="container">
          <div className="contact-grid" data-reveal>
            <div className="form-panel">
              <h2 className="panel-title">Send us a message</h2>
              <ContactForm />
            </div>

            <div>
              <div className="office-panel">
                <h2>Find us in Nairobi</h2>
                <p>
                  Find us easily and connect with our team in person. Visit our offices for
                  enquiries, consultations, support, or partnership discussions.
                </p>

                <div className="office-item">
                  <span className="lbl">Address</span>
                  <address>
                    {CONTACT.organization}
                    {CONTACT.addressLines.map((line) => (
                      <Fragment key={line}>
                        <br />
                        {line}
                      </Fragment>
                    ))}
                  </address>
                </div>
                <div className="office-item">
                  <span className="lbl">Telephone</span>
                  <address>
                    <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT.phone}</a>
                  </address>
                </div>
                <div className="office-item">
                  <span className="lbl">Email</span>
                  <address>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </address>
                </div>
                <div className="office-item">
                  <span className="lbl">Follow us</span>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
