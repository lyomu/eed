'use client';

import { useSubmitForm } from '@/lib/useSubmitForm';

export default function ContactForm() {
  const { note, submit } = useSubmitForm('/api/contact');

  return (
    <form onSubmit={submit}>
      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="c-name">Full Name</label>
          <input type="text" id="c-name" name="name" placeholder="Dr. Jane Smith" required />
        </div>
        <div className="form-row">
          <label htmlFor="c-email">Email Address</label>
          <input type="email" id="c-email" name="email" placeholder="jsmith@institution.edu" required />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="c-org">Organization</label>
          <input type="text" id="c-org" name="organization" placeholder="University of Nairobi" />
        </div>
        <div className="form-row">
          <label htmlFor="c-pillar">Research Pillar</label>
          <select id="c-pillar" name="pillar">
            <option>WASH</option>
            <option>Energy</option>
            <option>Climate</option>
            <option>Agriculture</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          placeholder="Describe the scope of your inquiry or potential collaboration…"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Inquiry
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}
