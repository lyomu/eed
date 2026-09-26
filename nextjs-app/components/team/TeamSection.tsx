'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TEAM_MEMBERS, type TeamMember } from '@/lib/team-data';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

type Phase = 'closed' | 'open' | 'visible' | 'closing';

const SLUG_RE = /^[a-z0-9-]+$/i;
const SHARE_STATUS_MS = 2600;

export default function TeamSection() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('closed');
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [photoError, setPhotoError] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [shareStatusShown, setShareStatusShown] = useState(false);

  const openTokenRef = useRef(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const shareStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMember = useCallback((member: TeamMember, trigger?: HTMLElement) => {
    lastTriggerRef.current = trigger ?? document.activeElement as HTMLElement;
    setActiveMember(member);
    setPhotoError(false);
    setShareStatus('');
    setShareStatusShown(false);
    document.body.style.overflow = 'hidden';
    setPhase('open');

    const token = ++openTokenRef.current;
    const reduced = prefersReducedMotion();
    if (reduced) {
      setPhase('visible');
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Guard against a rapid open/close: only settle into 'visible' if
        // nothing closed this modal again before the two rAFs fired.
        if (openTokenRef.current === token) setPhase('visible');
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    openTokenRef.current++;
    const reduced = prefersReducedMotion();
    if (reduced) {
      setPhase('closed');
      document.body.style.overflow = '';
      lastTriggerRef.current?.focus();
      return;
    }
    setPhase('closing');
    const durRaw = getComputedStyle(document.documentElement).getPropertyValue('--dur-exit');
    const dur = parseInt(durRaw, 10) || 260;
    setTimeout(() => {
      setPhase('closed');
      document.body.style.overflow = '';
      lastTriggerRef.current?.focus();
    }, dur);
  }, []);

  // Hash deep-linking: team-modal opens from #member-id on load and on hashchange.
  useEffect(() => {
    function openFromHash() {
      const raw = window.location.hash.slice(1);
      if (!raw || !SLUG_RE.test(raw)) return;
      const member = TEAM_MEMBERS.find((m) => m.id === raw);
      if (member) openMember(member);
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape closes; focus trap while open.
  useEffect(() => {
    if (phase === 'closed') return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [phase, closeModal]);

  useEffect(() => {
    if (phase === 'visible') closeBtnRef.current?.focus();
  }, [phase]);

  function profileUrl(memberId: string): string {
    return `${window.location.origin}${pathname}#${memberId}`;
  }

  function flashShareStatus(message: string) {
    if (shareStatusTimeoutRef.current) clearTimeout(shareStatusTimeoutRef.current);
    setShareStatus(message);
    setShareStatusShown(true);
    shareStatusTimeoutRef.current = setTimeout(() => setShareStatusShown(false), SHARE_STATUS_MS);
  }

  async function copyToClipboard(text: string): Promise<boolean> {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // fall through to execCommand fallback
      }
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }

  async function handleShare() {
    if (!activeMember) return;
    const url = profileUrl(activeMember.id);
    if (navigator.share) {
      try {
        await navigator.share({ title: activeMember.name, url });
      } catch {
        // user dismissed the native share sheet — nothing to report
      }
      return;
    }
    const copied = await copyToClipboard(url);
    flashShareStatus(copied ? 'Link copied' : 'Press Ctrl+C to copy');
  }

  const modalClassName = [
    'modal',
    phase !== 'closed' ? 'open' : '',
    phase === 'visible' ? 'is-visible' : '',
    phase === 'closing' ? 'closing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <section className="section on-paper">
        <div className="container">
          <div className="team-grid" data-reveal-stagger>
            {TEAM_MEMBERS.map((member) => (
              <button
                key={member.id}
                className="team-card"
                onClick={(e) => openMember(member, e.currentTarget)}
              >
                <div className="photo-block ratio-1x1">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    onError={(e) => e.currentTarget.remove()}
                  />
                  <span className="initials">{member.initials}</span>
                  <span className="card-veil" aria-hidden="true">
                    <span className="card-cta">View profile &rarr;</span>
                  </span>
                </div>
                <span className="name">{member.name}</span>
                <span className="role">{member.role}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div
        className={modalClassName}
        id="team-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-name"
        ref={modalRef}
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
      >
        <div className="modal-panel">
          <button className="modal-close" aria-label="Close" ref={closeBtnRef} onClick={closeModal}>
            &times;
          </button>
          <div className="modal-body">
            <div className="modal-head">
              <div className="modal-photo">
                <div className="photo-block ratio-1x1">
                  <img
                    alt=""
                    src={activeMember?.photo}
                    hidden={!activeMember || photoError}
                    onError={() => setPhotoError(true)}
                  />
                  <span className="initials">{activeMember?.initials}</span>
                </div>
              </div>
              <div className="modal-info">
                <h3 id="modal-name">{activeMember?.name}</h3>
                <span className="role">{activeMember?.role}</span>
                <div className="profile-links">
                  <a
                    className="profile-link"
                    href={activeMember?.linkedin || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    hidden={!activeMember?.linkedin}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path
                        fill="currentColor"
                        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V21h-4V9Z"
                      />
                    </svg>
                    <span className="visually-hidden">
                      LinkedIn profile — {activeMember?.name}
                    </span>
                  </a>

                  <a
                    className="profile-link profile-link--scholar"
                    href={activeMember?.scholar || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    hidden={!activeMember?.scholar}
                  >
                    <svg
                      viewBox="0.6 2.2 22.8 17"
                      aria-hidden="true"
                      focusable="false"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3.4 1.8 8.6 12 13.8l10.2-5.2L12 3.4Z" />
                      <path d="M5.6 10.8v4.1c0 1.9 2.87 3.4 6.4 3.4s6.4-1.5 6.4-3.4v-4.1" />
                      <path d="M21.4 9.2v5" />
                    </svg>
                    <span className="visually-hidden">
                      Google Scholar profile — {activeMember?.name}
                    </span>
                  </a>

                  <button type="button" className="profile-link" onClick={handleShare}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18" cy="5.2" r="2.6" />
                      <circle cx="6" cy="12" r="2.6" />
                      <circle cx="18" cy="18.8" r="2.6" />
                      <path d="M8.3 10.7 15.7 6.5m-7.4 6.8 7.4 4.2" />
                    </svg>
                    <span className="visually-hidden">Share this profile</span>
                  </button>

                  <span
                    className={`profile-share-status${shareStatusShown ? ' is-shown' : ''}`}
                    role="status"
                    aria-live="polite"
                  >
                    {shareStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-bio" tabIndex={0}>
              {activeMember?.bio?.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
