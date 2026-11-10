'use client';

import { useSubmitForm } from '@/lib/useSubmitForm';

export default function InquiryForm() {
  const { note, submit } = useSubmitForm('/api/inquiry');

  return (
    <form onSubmit={submit}>
      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="home-name">Name</label>
          <input type="text" id="home-name" name="name" required />
        </div>
        <div className="form-row">
          <label htmlFor="home-email">Email</label>
          <input type="email" id="home-email" name="email" required />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="home-org">Organization</label>
        <input type="text" id="home-org" name="organization" />
      </div>
      <div className="form-row">
        <label htmlFor="home-message">Message</label>
        <textarea id="home-message" name="message" rows={3} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Send Inquiry
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}
