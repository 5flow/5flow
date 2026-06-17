'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MoveLeftIcon, MoveRightIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { identifyHubSpotVisitor } from '@/lib/hubspot-browser';
import type { DownloadCardItem } from '@/lib/resources/downloads';

type DownloadLeadFormProps = {
  item: DownloadCardItem;
  onClose: () => void;
};

type FormState = {
  email: string;
  consentContact: boolean;
  consentPrivacy: boolean;
};

const initialState: FormState = {
  email: '',
  consentContact: false,
  consentPrivacy: false,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isWorkEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  if (!domain) return false;

  const freeDomains = new Set([
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'yahoo.co.uk',
    'ymail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'msn.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'aol.com',
    'proton.me',
    'protonmail.com',
    'gmx.com',
    'mail.com',
    'yandex.com',
    'mail.ru',
    'pm.me',
    'zoho.eu',
  ]);

  return !freeDomains.has(domain);
}

export default function DownloadLeadForm({ item, onClose }: DownloadLeadFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  }

  function validateEmail() {
    let message: string | undefined;

    if (!values.email.trim()) message = 'Company email is required';
    else if (!isValidEmail(values.email)) message = 'Enter a valid email address';
    else if (!isWorkEmail(values.email)) message = 'Please use your company email';

    setErrors(current => ({ ...current, email: message }));
    return !message;
  }

  function goToPolicyStep() {
    if (!validateEmail()) {
      toast.error('Please enter a valid company email.');
      return;
    }

    setStep(2);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateEmail()) {
      setStep(1);
      toast.error('Please enter a valid company email.');
      return;
    }

    if (!values.consentPrivacy) {
      setErrors(current => ({ ...current, consentPrivacy: 'Please confirm your privacy consent.' }));
      toast.error('Please confirm your privacy consent.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          downloadedResource: item.title,
          downloadedResourceUrl: item.href,
          sourcePage: window.location.pathname,
          sourceUrl: window.location.href,
          referrer: document.referrer || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.detail || json?.error || 'Submission failed');
      identifyHubSpotVisitor({ email: values.email });

      toast.success('Thanks! Your download is ready.');
      setValues(initialState);
      onClose();

      if (item.href && item.href !== '#') {
        window.open(item.href, item.href.startsWith('http') ? '_blank' : '_self', 'noopener,noreferrer');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 sm:p-6 md:p-8  "
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-form-title"
    >
      <div className="border-border bg-background relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden border shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:max-h-[calc(100dvh-3rem)] md:max-h-[calc(100dvh-4rem)]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close download form"
          className="text-primary hover:bg-muted absolute top-3 right-3 z-10 rounded-none sm:top-4 sm:right-4"
        >
          <XIcon className="h-5 w-5" />
        </Button>

        <form onSubmit={submit} className="flex min-h-0 flex-col">
          <div className="flex min-h-0 flex-col gap-6 overflow-y-auto p-5 pt-6 sm:gap-7 sm:p-8 md:p-10">
            <div className="flex max-w-xl flex-col gap-2.5 pr-10">
              <span className="font-heading text-primary text-xs font-bold tracking-wide uppercase">
                Download resource
              </span>
              <h2
                id="download-form-title"
                className="font-heading text-primary text-2xl leading-tight font-bold sm:text-3xl md:text-4xl"
              >
                {step === 1
                  ? 'Just enter your company email to get instant access.'
                  : 'One last step before your download.'}
              </h2>
              <p className="font-body text-foreground/70 text-sm leading-5 sm:leading-6">{item.title}</p>
            </div>

            {step === 1 ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="download-email" className="font-body text-primary text-sm font-medium">
                  Company email<span aria-hidden="true">*</span>
                </label>
                <Input
                  id="download-email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={e => onChange('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'download-email-error' : undefined}
                  className="border-foreground/60 focus-visible:border-primary bg-background h-12 rounded-none border px-3 text-base shadow-none"
                />
                {errors.email ? (
                  <p id="download-email-error" className="text-destructive font-body text-sm leading-5">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="font-body flex max-w-2xl flex-col gap-4 text-sm leading-5 sm:text-base sm:leading-6">
                <p>
                  By checking the box below, you agree to receive communications from 5Flow. You can unsubscribe
                  anytime.
                </p>
                <label className="flex items-start gap-3">
                  <Checkbox
                    checked={values.consentContact}
                    onCheckedChange={value => onChange('consentContact', Boolean(value))}
                    className="border-primary/50 mt-1 rounded-none"
                  />
                  <span className="text-primary">I agree to receive other communications from 5Flow.</span>
                </label>

                <p>
                  To process your request, we need your permission to store and process your personal data. Please check
                  the box below to confirm your consent.
                </p>
                <label className="flex items-start gap-3">
                  <Checkbox
                    checked={values.consentPrivacy}
                    onCheckedChange={value => onChange('consentPrivacy', Boolean(value))}
                    aria-invalid={Boolean(errors.consentPrivacy)}
                    className="border-primary/50 mt-1 rounded-none"
                  />
                  <span className="text-primary">I agree to allow 5Flow to store and process my personal data.*</span>
                </label>
                {errors.consentPrivacy ? <p className="text-destructive text-sm">{errors.consentPrivacy}</p> : null}
                <p>
                  We care about your privacy. Learn how we handle your data in our{' '}
                  <Link href="/privacy" target="_blank" className="text-primary underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>

          <div className="border-border bg-background flex shrink-0 flex-col gap-4 border-t p-5 sm:p-6">
            <div className="flex flex-col gap-2">
              <span className="font-body text-primary text-sm font-medium">{step}/2</span>
              <div className="bg-muted h-3 w-full overflow-hidden rounded-full" aria-hidden="true">
                <div
                  className="bg-success h-full rounded-full transition-[width] duration-300 ease-[var(--easing-smooth)]"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              {step === 2 ? (
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition-all duration-200 active:translate-x-px active:scale-[0.99] sm:min-w-32 sm:flex-none"
                >
                  <MoveLeftIcon className="h-4 w-4" />
                  Previous
                </Button>
              ) : null}
              <Button
                type={step === 1 ? 'button' : 'submit'}
                onClick={step === 1 ? goToPolicyStep : undefined}
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition-all duration-200 active:translate-x-px active:scale-[0.99] sm:min-w-32 sm:flex-none"
              >
                {submitting ? 'Submitting...' : step === 1 ? 'Next' : 'Submit'}
                {step === 1 ? <MoveRightIcon className="h-4 w-4" /> : null}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
