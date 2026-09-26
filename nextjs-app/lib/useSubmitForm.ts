import { useCallback, useState, type FormEvent } from 'react';
import { useToast } from '@/components/ToastProvider';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const SUCCESS_NOTE = 'Thank you — your inquiry has been received.';
const ERROR_NOTE = 'Something went wrong. Please try again.';

export function useSubmitForm(endpoint: string) {
  const { showToast } = useToast();
  const [state, setState] = useState<SubmitState>('idle');
  const [note, setNote] = useState('');

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      setState('submitting');

      const payload = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({ ok: false }));

        if (!res.ok || !json.ok) {
          setState('error');
          setNote(json.errors?.[0]?.message ?? ERROR_NOTE);
          return;
        }

        setState('success');
        setNote(SUCCESS_NOTE);
        showToast('Inquiry sent');
        form.reset();
      } catch {
        setState('error');
        setNote(ERROR_NOTE);
      }
    },
    [endpoint, showToast]
  );

  return { state, note, submit };
}
