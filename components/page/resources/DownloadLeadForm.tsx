'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MoveRightIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { DownloadCardItem } from '@/lib/resources/downloads';
import { countries as allCountries } from '@/lib/countries';
import { cn } from '@/lib/utils';

type DownloadLeadFormProps = {
  item: DownloadCardItem;
  onClose: () => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  consentPrivacy: boolean;
  consentContact: boolean;
};

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  country: '',
  consentPrivacy: false,
  consentContact: false,
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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!values.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!values.email.trim()) nextErrors.email = 'Work email is required';
    else if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address';
    else if (!isWorkEmail(values.email)) nextErrors.email = 'Please use your work email (no Gmail/Yahoo/etc.)';
    if (!values.company.trim()) nextErrors.company = 'Company is required';
    if (!values.country.trim()) nextErrors.country = 'Country is required';
    if (!values.consentPrivacy) nextErrors.consentPrivacy = 'Please confirm you have read the Privacy Policy';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please complete the required fields.');
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
      if (!res.ok) throw new Error(json?.error || 'Submission failed');

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-form-title"
    >
      <div className="bg-background text-foreground flex max-h-full w-full max-w-2xl flex-col overflow-y-auto border shadow-xl">
        <div className="border-border flex items-start justify-between gap-4 border-b p-5">
          <div className="flex flex-col gap-1">
            <b id="download-form-title" className="font-heading text-2xl leading-tight">
              {item.title}
            </b>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Complete the form to access this resource.
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close download form">
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5 p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              placeholder="First Name"
              value={values.firstName}
              onChange={e => onChange('firstName', e.target.value)}
              className="rounded-none"
            />
            <Input
              placeholder="Last Name*"
              required
              value={values.lastName}
              onChange={e => onChange('lastName', e.target.value)}
              className="rounded-none"
            />
            <Input
              type="email"
              placeholder="Work Email*"
              required
              value={values.email}
              onChange={e => onChange('email', e.target.value)}
              className="rounded-none"
            />
            <Input
              placeholder="Company*"
              required
              value={values.company}
              onChange={e => onChange('company', e.target.value)}
              className="rounded-none"
            />
            <select
              required
              value={values.country}
              onChange={e => onChange('country', e.target.value)}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-none border px-3 py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
            >
              <option value="" disabled>
                Country*
              </option>
              {allCountries.map(country => (
                <option key={country} value={country} className="text-foreground">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {Object.values(errors).filter(Boolean).length > 0 && (
            <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border p-3 text-xs sm:text-sm">
              <ul className="list-disc space-y-1 pl-4">
                {Object.values(errors)
                  .filter(Boolean)
                  .map((message, index) => (
                    <li key={index}>{message as string}</li>
                  ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={values.consentPrivacy}
                onCheckedChange={value => onChange('consentPrivacy', Boolean(value))}
                className="rounded-none"
              />
              <p className="text-xs leading-relaxed">
                {`I have read the `}
                <Link href="/privacy" target="_blank" className="underline">
                  Privacy Policy
                </Link>
                {`.*`}
              </p>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={values.consentContact}
                onCheckedChange={value => onChange('consentContact', Boolean(value))}
                className="rounded-none"
              />
              <p className="text-xs leading-relaxed">
                {`I authorize 5Flow to contact me by phone or email. I can opt out at any time.`}
              </p>
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting || !values.consentPrivacy}
              className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
            >
              <span
                className={cn(
                  'bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3',
                )}
              >
                {submitting ? 'Submitting...' : 'Get download'}
              </span>
              <span
                className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
                aria-hidden="true"
              >
                <MoveRightIcon className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
