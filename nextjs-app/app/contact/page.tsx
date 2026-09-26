import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import FallbackImage from '@/components/FallbackImage';

export const metadata: Metadata = {
  title: 'Contact Us — EED Research Institute',
  description:
    'Collaborate with EED Research Institute. Reach our East Africa hub in Nairobi, Kenya, or submit a research inquiry.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head page-head--image on-image">
        <FallbackImage
          className="hero-bg"
          src="/assets/hero/hero-contact.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="container">
          <div className="hero-enter">
            <span className="hero-kicker">Get In Touch</span>
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
                  <span className="lbl">EED Advisory Limited</span>
                  <address>
                    50 Hamisi Road, Kileleshwa
                    <br />
                    Nairobi, Kenya
                    <br />
                    P.O. Box 66053-00800, Nairobi
                  </address>
                </div>
                <div className="office-item">
                  <span className="lbl">Telephone</span>
                  <address>
                    <a href="tel:+254202574927">+254 (20) 2574927</a>
                  </address>
                </div>
                <div className="office-item">
                  <span className="lbl">Email</span>
                  <address>
                    <a href="mailto:eri@eedadvisory.com">eri@eedadvisory.com</a>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
