'use client';

import { useEffect, useState } from 'react';
import { MoveUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { identifyHubSpotVisitor } from '@/lib/hubspot-browser';

const STORAGE_KEY = 'podcast-notification-popup-dismissed';

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PodcastNotificationPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') return;

    const timer = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    }
    setOpen(false);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFeedback({ type: 'error', message: 'Email is required.' });
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setFeedback({ type: 'error', message: 'Enter a valid email.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/podcast-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          sourcePage: window.location.pathname,
          sourceUrl: window.location.href,
          referrer: document.referrer || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submission failed');
      identifyHubSpotVisitor({ email: trimmedEmail });

      setFeedback({ type: 'success', message: 'Thanks. We will notify you when new episodes go live.' });
      setEmail('');
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Submission failed.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-foreground/45 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="podcast-notification-title"
    >
      <div className="bg-background border-border relative w-full max-w-xl rounded-2xl border p-6 shadow-2xl md:p-8">
        <button
          type="button"
          onClick={close}
          className="text-foreground hover:bg-muted absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          aria-label="Close podcast notification form"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10">
          <h2
            id="podcast-notification-title"
            className="font-heading text-4xl leading-none font-bold tracking-tight md:text-4xl"
          >
            Notify me of new episodes
          </h2>
          <p className="mt-4 max-w-md text-sm leading-5 tracking-tight md:text-base">
            Get a short email when a new episode is available.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <label htmlFor="podcast-notification-email" className="sr-only">
            Email
          </label>
          <Input
            id="podcast-notification-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-invalid={feedback?.type === 'error'}
            className="font-body border-foreground/20 min-h-11 rounded-none bg-background"
          />

          {feedback ? (
            <p
              className={`text-sm leading-5 ${feedback.type === 'success' ? 'text-success' : 'text-destructive'}`}
              role="status"
              aria-live="polite"
            >
              {feedback.message}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={submitting}
            className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
          >
            <span className="bg-primary text-primary-foreground group-hover/cta:bg-primary/90 group-active/cta:bg-primary/80 inline-flex h-10 items-center px-5 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-6">
              {submitting ? 'Submitting...' : 'Notify me'}
            </span>
            <span
              className="bg-primary text-primary-foreground group-hover/cta:bg-primary/90 group-active/cta:bg-primary/80 ml-0 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
              aria-hidden="true"
            >
              <MoveUpRight className="h-4 w-4" />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
