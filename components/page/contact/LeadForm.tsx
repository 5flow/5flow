'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDownIcon, MoveRightIcon } from 'lucide-react';
import Lottie from 'lottie-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { countries as allCountries } from '@/lib/countries';
import { identifyHubSpotVisitor } from '@/lib/hubspot-browser';
import { phoneCountryCodes } from '@/lib/phone-country-codes';
import { cn } from '@/lib/utils';
import failedAnimation from '@/public/lottie/5flow_failed.json';
import submittedAnimation from '@/public/lottie/5flow_submitted.json';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryIso: string;
  phoneCountryCode: string;
  phone: string;
  company: string;
  position: string;
  zip: string;
  country: string;
  requestType: 'Demo' | 'General information' | 'Other' | '';
  message: string;
  consentPrivacy: boolean;
  consentContact: boolean;
  consentMarketing: boolean;
};

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCountryIso: '',
  phoneCountryCode: '',
  phone: '',
  company: '',
  position: '',
  zip: '',
  country: '',
  requestType: '',
  message: '',
  consentPrivacy: false,
  consentContact: false,
  consentMarketing: false,
};

type LeadFormProps = {
  title?: ReactNode;
  className?: string;
  titleClassName?: string;
  fieldsClassName?: string;
  fieldClassName?: string;
  progressClassName?: string;
  progressTextClassName?: string;
  footerClassName?: string;
  buttonHeightClassName?: string;
  feedbackMode?: 'toast' | 'inline';
};

type SubmissionFeedback = {
  type: 'success' | 'error';
  message: string;
};

function FlagMark({ iso }: { iso?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-3.5 w-5 shrink-0 rounded-[1px] bg-cover bg-center shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
      style={iso ? { backgroundImage: `url(https://flagcdn.com/w40/${iso}.png)` } : undefined}
    />
  );
}

const timeZoneCountryFallbacks: Record<string, string> = {
  'Asia/Calcutta': 'IN',
  'Asia/Kolkata': 'IN',
  'Europe/Berlin': 'DE',
  'Europe/Rome': 'IT',
  'Europe/London': 'GB',
  'Europe/Paris': 'FR',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Vienna': 'AT',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Asia/Dubai': 'AE',
  'Asia/Singapore': 'SG',
  'Asia/Tokyo': 'JP',
};

function getPhoneCountryByIso(countryIso?: string) {
  if (!countryIso) return undefined;
  const iso = countryIso.toLowerCase();
  return phoneCountryCodes.find(country => country.flag.iso === iso);
}

function getBrowserCountryIso() {
  const locales =
    typeof navigator !== 'undefined' ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : [];

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;
      if (region) return region;
    } catch {
      // Ignore malformed browser locale values.
    }
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZoneCountryFallbacks[timeZone];
}

export default function LeadForm({
  title,
  className,
  titleClassName,
  fieldsClassName,
  fieldClassName,
  progressClassName,
  progressTextClassName,
  footerClassName,
  buttonHeightClassName = 'h-9',
  feedbackMode = 'toast',
}: LeadFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submissionFeedback, setSubmissionFeedback] = useState<SubmissionFeedback | null>(null);
  const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);
  const [phoneCountrySearch, setPhoneCountrySearch] = useState('');
  const [activePhoneCountryIndex, setActivePhoneCountryIndex] = useState(0);
  const phoneCodeRef = useRef<HTMLDivElement>(null);
  const phoneCountryListRef = useRef<HTMLDivElement>(null);
  const selectedPhoneCountry =
    getPhoneCountryByIso(values.phoneCountryIso) ||
    phoneCountryCodes.find(({ code }) => code === values.phoneCountryCode);
  const filteredPhoneCountries = useMemo(() => {
    const search = phoneCountrySearch.trim().toLowerCase();
    if (!search) return phoneCountryCodes;

    return phoneCountryCodes.filter(({ country, code }) => {
      return country.toLowerCase().includes(search) || code.includes(search);
    });
  }, [phoneCountrySearch]);

  useEffect(() => {
    function closePhoneCodePicker(event: MouseEvent) {
      if (!phoneCodeRef.current?.contains(event.target as Node)) {
        setPhoneCodeOpen(false);
      }
    }

    document.addEventListener('mousedown', closePhoneCodePicker);
    return () => document.removeEventListener('mousedown', closePhoneCodePicker);
  }, []);

  useEffect(() => {
    setActivePhoneCountryIndex(0);
  }, [phoneCountrySearch, phoneCodeOpen]);

  useEffect(() => {
    const activeOption = phoneCountryListRef.current?.querySelector<HTMLElement>(
      `[data-phone-country-index="${activePhoneCountryIndex}"]`
    );
    activeOption?.scrollIntoView({ block: 'nearest' });
  }, [activePhoneCountryIndex]);

  useEffect(() => {
    if (values.phoneCountryCode) return;

    let cancelled = false;

    async function setDetectedPhoneCountry() {
      let detectedIso: string | undefined;

      try {
        const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
        const data = (await res.json()) as { country_code?: string };
        detectedIso = data.country_code;
      } catch {
        detectedIso = undefined;
      }

      const detectedCountry = getPhoneCountryByIso(detectedIso) || getPhoneCountryByIso(getBrowserCountryIso());
      if (!cancelled && detectedCountry) {
        setValues(current =>
          current.phoneCountryCode
            ? current
            : { ...current, phoneCountryCode: detectedCountry.code, phoneCountryIso: detectedCountry.flag.iso }
        );
      }
    }

    setDetectedPhoneCountry();

    return () => {
      cancelled = true;
    };
  }, [values.phoneCountryCode]);

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

  function isValidPhoneNumber(phone: string) {
    const trimmed = phone.trim();
    const digitCount = trimmed.replace(/\D/g, '').length;
    return digitCount >= 6 && digitCount <= 15 && /^[0-9\s().-]+$/.test(trimmed);
  }

  function onChange<K extends keyof FormState>(key: K, val: FormState[K]) {
    setValues(v => ({ ...v, [key]: val }));
  }

  function selectPhoneCountry(code: string, iso: string) {
    setValues(current => ({ ...current, phoneCountryCode: code, phoneCountryIso: iso }));
    setPhoneCodeOpen(false);
    setPhoneCountrySearch('');
    if (errors.phoneCountryCode) {
      setErrors(prev => ({ ...prev, phoneCountryCode: undefined }));
    }
  }

  function onPhoneCountrySearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'Escape') {
      setPhoneCodeOpen(false);
      return;
    }

    if (filteredPhoneCountries.length === 0) return;

    if (e.key === 'ArrowDown') {
      setActivePhoneCountryIndex(current => Math.min(current + 1, filteredPhoneCountries.length - 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      setActivePhoneCountryIndex(current => Math.max(current - 1, 0));
      return;
    }

    const selectedCountry = filteredPhoneCountries[activePhoneCountryIndex];
    selectPhoneCountry(selectedCountry.code, selectedCountry.flag.iso);
  }

  function validateStep(current: number) {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (current === 0) {
      if (!values.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!values.email.trim()) newErrors.email = 'Work email is required';
      else if (!isValidEmail(values.email)) newErrors.email = 'Enter a valid email address';
      else if (!isWorkEmail(values.email)) newErrors.email = 'Please use your work email (no Gmail/Yahoo/etc.)';
      if (!values.phoneCountryCode.trim()) newErrors.phoneCountryCode = 'Phone country code is required';
      if (!values.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!isValidPhoneNumber(values.phone)) newErrors.phone = 'Enter a valid phone number';
    }

    if (current === 1) {
      if (!values.company.trim()) newErrors.company = 'Company is required';
      if (!values.country.trim()) newErrors.country = 'Country is required';
    }

    if (current === 2) {
      if (!values.requestType) newErrors.requestType = 'Type of request is required';
      if (!values.consentPrivacy) newErrors.consentPrivacy = 'Please confirm you have read the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function next() {
    setStep(s => (s < 2 && validateStep(s) ? ((s + 1) as 0 | 1 | 2) : s));
  }

  function prev() {
    setStep(s => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (step < 2) {
      if (validateStep(step)) {
        next();
      } else {
        toast.error('Please complete the required fields to continue.');
      }
      return;
    }

    if (!validateStep(2)) {
      toast.error('Please fix the errors below.');
      return;
    }

    setSubmitting(true);
    try {
      const sourcePage = window.location.pathname;
      const sourceUrl = window.location.href;
      const referrer = document.referrer || undefined;
      const fullPhone = `${values.phoneCountryCode} ${values.phone.trim()}`;
      const res = await fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: fullPhone,
          sourcePage,
          sourceUrl,
          referrer,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submission failed');
      identifyHubSpotVisitor({
        email: values.email,
        firstname: values.firstName || undefined,
        lastname: values.lastName,
        company: values.company,
        phone: fullPhone,
      });
      const successMessage = "Thanks! We'll be in touch shortly.";
      if (feedbackMode === 'inline') {
        setSubmissionFeedback({ type: 'success', message: successMessage });
      } else {
        toast.success(successMessage);
      }
      setValues(initialState);
      setErrors({});
      setStep(0);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      if (feedbackMode === 'inline') {
        setSubmissionFeedback({ type: 'error', message });
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={e => {
        if (e.key === 'Enter' && step < 2) {
          e.preventDefault();
          if (validateStep(step)) next();
        }
      }}
      className={cn('relative flex flex-1 flex-col gap-6', className)}
    >
      {feedbackMode === 'inline' && submissionFeedback ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[360px] w-full flex-1 flex-col items-center justify-center gap-4 text-center md:min-h-[520px]"
        >
          <Lottie
            animationData={submissionFeedback.type === 'success' ? submittedAnimation : failedAnimation}
            loop
            className="h-40 w-40 max-w-full sm:h-42 sm:w-42 md:h-50 md:w-50"
          />
          <div className="max-w-md">
            <p className="text-success font-heading text-4xl leading-none font-bold tracking-tight sm:text-5xl md:text-6xl">
              {submissionFeedback.type === 'success' ? 'Thank you' : 'Submission failed'}
            </p>
            <p className="text-background mt-4 text-base leading-snug md:text-lg">{submissionFeedback.message}</p>
          </div>
        </div>
      ) : (
        <>
          {title ? <div className={titleClassName}>{title}</div> : null}

          {step === 0 && (
            <div className={cn('flex flex-col gap-2', fieldsClassName)}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={e => onChange('firstName', e.target.value)}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full min-w-0 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
                <Input
                  placeholder="Last Name*"
                  required
                  value={values.lastName}
                  onChange={e => onChange('lastName', e.target.value)}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full min-w-0 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  type="email"
                  placeholder="Work Email*"
                  required
                  value={values.email}
                  onChange={e => {
                    onChange('email', e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full min-w-0 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
                <div ref={phoneCodeRef} className="relative w-full min-w-0">
                  <div
                    className={cn(
                      'font-body border-boder bg-background focus-within:ring-success flex min-h-10 w-full overflow-hidden rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus-within:ring-2 focus-within:ring-offset-2',
                      fieldClassName
                    )}
                  >
                    <button
                      type="button"
                      aria-label="Choose phone country code"
                      aria-expanded={phoneCodeOpen}
                      onClick={() => setPhoneCodeOpen(open => !open)}
                      className="border-boder flex w-14 shrink-0 items-center justify-center gap-1 border-r bg-transparent px-2 transition-colors duration-300 ease-[var(--easing-smooth)] outline-none hover:bg-black/5"
                    >
                      <FlagMark iso={selectedPhoneCountry?.flag.iso} />
                      <ChevronDownIcon className="text-muted-foreground h-3 w-3 shrink-0" aria-hidden="true" />
                    </button>
                    <span className="text-muted-foreground inline-flex shrink-0 items-center pl-3 text-inherit">
                      {values.phoneCountryCode}
                    </span>
                    <Input
                      type="tel"
                      placeholder="Phone Number*"
                      required
                      autoComplete="tel-national"
                      value={values.phone}
                      onChange={e => {
                        onChange('phone', e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      className="font-body placeholder:text-muted-foreground h-auto min-h-0 min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 text-inherit shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  {phoneCodeOpen ? (
                    <div
                      className="border-foreground/70 bg-background absolute top-[calc(100%+4px)] left-0 z-50 w-full overflow-hidden rounded-none border shadow-lg"
                      onWheel={e => e.stopPropagation()}
                    >
                      <Input
                        type="search"
                        placeholder="Search"
                        value={phoneCountrySearch}
                        onChange={e => setPhoneCountrySearch(e.target.value)}
                        onKeyDown={onPhoneCountrySearchKeyDown}
                        className="font-body border-boder h-10 rounded-none border-0 border-b bg-transparent px-3 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        autoFocus
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="phone-country-list"
                        aria-activedescendant={
                          filteredPhoneCountries[activePhoneCountryIndex]
                            ? `phone-country-${activePhoneCountryIndex}`
                            : undefined
                        }
                      />
                      <div
                        id="phone-country-list"
                        ref={phoneCountryListRef}
                        role="listbox"
                        onWheel={e => e.stopPropagation()}
                        className="[&::-webkit-scrollbar-thumb]:bg-foreground/35 [&::-webkit-scrollbar-track]:bg-muted max-h-52 overflow-y-scroll [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full"
                        style={{ scrollbarWidth: 'thin' }}
                      >
                        {filteredPhoneCountries.map(({ country, code, flag }, index) => (
                          <button
                            key={`${country}-${code}`}
                            id={`phone-country-${index}`}
                            data-phone-country-index={index}
                            type="button"
                            role="option"
                            aria-selected={index === activePhoneCountryIndex}
                            className={cn(
                              'font-body text-foreground hover:bg-muted flex h-9 w-full items-center gap-2 px-3 text-left text-sm transition-colors duration-150',
                              index === activePhoneCountryIndex && 'bg-muted'
                            )}
                            onMouseEnter={() => setActivePhoneCountryIndex(index)}
                            onClick={() => {
                              selectPhoneCountry(code, flag.iso);
                            }}
                          >
                            <FlagMark iso={flag.iso} />
                            <span className="min-w-0 flex-1 truncate">{country}</span>
                            <span className="text-muted-foreground shrink-0 pl-2">{code}</span>
                          </button>
                        ))}
                        {filteredPhoneCountries.length === 0 ? (
                          <p className="text-muted-foreground px-3 py-3 text-sm">No countries found</p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={cn('flex flex-col gap-2', fieldsClassName)}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <Input
                  placeholder="Company Name*"
                  required
                  value={values.company}
                  onChange={e => {
                    onChange('company', e.target.value);
                    if (errors.company) setErrors(prev => ({ ...prev, company: undefined }));
                  }}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full flex-1 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
                <Input
                  placeholder="Position"
                  value={values.position}
                  onChange={e => onChange('position', e.target.value)}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full flex-1 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
              </div>
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <Input
                  placeholder="ZIP Code"
                  value={values.zip}
                  onChange={e => onChange('zip', e.target.value)}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full flex-1 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                />
                <select
                  required
                  value={values.country}
                  onChange={e => {
                    onChange('country', e.target.value);
                    if (errors.country) setErrors(prev => ({ ...prev, country: undefined }));
                  }}
                  className={cn(
                    'font-body border-boder bg-background focus:ring-success min-h-10 w-full flex-1 rounded-none border px-3 text-sm transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                    fieldClassName
                  )}
                >
                  <option value="" disabled>
                    Country*
                  </option>
                  {allCountries.map(c => (
                    <option key={c} value={c} className="text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={cn('flex flex-col gap-2', fieldsClassName)}>
              <select
                required
                value={values.requestType}
                onChange={e => onChange('requestType', e.target.value as FormState['requestType'])}
                className={cn(
                  'font-body border-boder bg-background focus:ring-success min-h-10 w-full rounded-none border px-3 text-sm transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                  fieldClassName
                )}
              >
                <option value="" disabled>
                  Type of request*
                </option>
                <option value="Demo">Demo</option>
                <option value="General information">General information</option>
                <option value="Other">Other</option>
              </select>
              <Textarea
                placeholder="Your message"
                value={values.message}
                onChange={e => onChange('message', e.target.value)}
                className={cn(
                  'font-body border-boder bg-background focus:ring-success w-full flex-1 rounded-none border transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2',
                  fieldClassName
                )}
              />
            </div>
          )}

          {Object.values(errors).filter(Boolean).length > 0 && (
            <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border p-3 text-xs sm:text-sm">
              <ul className="list-disc space-y-1 pl-4">
                {Object.values(errors)
                  .filter(Boolean)
                  .map((msg, idx) => (
                    <li key={idx}>{msg as string}</li>
                  ))}
              </ul>
            </div>
          )}

          <div className={cn('flex w-full flex-col gap-2', progressClassName)}>
            <span className={cn('text-background text-xs', progressTextClassName)}>{`${step + 1}/3`}</span>
            <div className="bg-muted h-2 w-full rounded-full">
              <div
                className="bg-success h-2 rounded-full transition-all duration-300 ease-[var(--easing-smooth)]"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div
            className={cn(
              'text-background flex flex-col gap-4 md:flex-row md:items-start md:justify-between',
              footerClassName
            )}
          >
            {step === 2 ? (
              <div className="flex max-w-xl flex-col gap-2">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={values.consentPrivacy}
                    onCheckedChange={v => onChange('consentPrivacy', Boolean(v))}
                    className="border-border bg-background cursor-pointer rounded-none"
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
                    onCheckedChange={v => onChange('consentContact', Boolean(v))}
                    className="border-border bg-background cursor-pointer rounded-none"
                  />
                  <p className="text-xs leading-relaxed">
                    {`We'd love to keep in touch with solutions that may be of interest to you. Check this box if you authorize 5Flow to contact you by phone or email. You can opt out at any time.`}
                  </p>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={values.consentMarketing}
                    onCheckedChange={v => onChange('consentMarketing', Boolean(v))}
                    className="border-border bg-background cursor-pointer rounded-none"
                  />
                  <p className="text-xs leading-relaxed">Subscribe to the Marketing Information</p>
                </label>
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center justify-center gap-3 md:justify-start">
              {step > 0 && (
                <Button
                  type="button"
                  onClick={prev}
                  className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                >
                  <span
                    className={cn(
                      'bg-muted text-foreground group-hover/cta:bg-muted/80 group-active/cta:bg-muted/70 inline-flex items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3',
                      buttonHeightClassName
                    )}
                  >
                    Previous
                  </span>
                </Button>
              )}

              {step < 2 ? (
                <Button
                  type="button"
                  onClick={() =>
                    validateStep(step) ? next() : toast.error('Please complete the required fields to continue.')
                  }
                  className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                >
                  <span
                    className={cn(
                      'bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3',
                      buttonHeightClassName
                    )}
                  >
                    Next
                  </span>
                  <span
                    className={cn(
                      'bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2',
                      buttonHeightClassName
                    )}
                    aria-hidden="true"
                  >
                    <MoveRightIcon className="h-4 w-4" />
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting || !values.consentPrivacy}
                  className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                >
                  <span
                    className={cn(
                      'bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3',
                      buttonHeightClassName
                    )}
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </span>
                  <span
                    className={cn(
                      'bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2',
                      buttonHeightClassName
                    )}
                    aria-hidden="true"
                  >
                    <MoveRightIcon className="h-4 w-4" />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </form>
  );
}
