const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FormValidationError = { field: string; message: string };

export function validateInquiry(data: Record<string, unknown>): FormValidationError[] {
  const errors: FormValidationError[] = [];
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();

  if (!name) errors.push({ field: 'name', message: 'Name is required.' });
  if (!email) errors.push({ field: 'email', message: 'Email is required.' });
  else if (!EMAIL_RE.test(email)) errors.push({ field: 'email', message: 'Enter a valid email address.' });
  if (!message) errors.push({ field: 'message', message: 'Message is required.' });

  return errors;
}
