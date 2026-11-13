/**
 * ERI's public contact details, shown on the contact page and the homepage
 * fallback. Kept in one place so a change here updates every page. The contact
 * page uses these in preference to the values stored in Prismic.
 */
export const CONTACT = {
  organization: 'EED Research Institute (ERI)',
  addressLines: ['50 Hamisi Road, Kileleshwa', 'Nairobi, Kenya', 'P.O. Box 66053-00800, Nairobi'],
  phone: '+254 745 033484',
  email: 'info@eedresearch.com',
};

/** "+254 745 033484" -> "+254745033484", for tel: links. */
export const CONTACT_PHONE_HREF = CONTACT.phone.replace(/[^+\d]/g, '');
