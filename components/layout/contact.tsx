'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { MoveUpRight, Mail, User } from 'lucide-react';
import InlineHighlight from '@/components/core/inline-highlight';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ContactProps = {
  leadingText?: string;
  highlightedText?: string;
  trailingText?: string;
};

export function Contact({
  leadingText = 'Built for the way brands',
  highlightedText = 'work today.',
  trailingText = '',
}: ContactProps) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function onChange(key: keyof typeof values, val: string) {
    setValues(v => ({ ...v, [key]: val }));
    if (key === 'email' && errors.email) {
      setErrors({});
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!values.email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!isValidEmail(values.email)) {
      setErrors({ email: 'Enter a valid email address' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          requestType: 'Demo',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submission failed');
      toast.success("Thanks! We'll be in touch shortly.");
      setValues({ firstName: '', lastName: '', email: '' });
      setErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <FullBleedLines className="font-heading mx-auto w-full max-w-3xl gap-16 px-2 py-8">
        <p className="text-center text-4xl leading-none font-bold tracking-tight md:text-[64px]">
          {leadingText} <InlineHighlight>{highlightedText}</InlineHighlight>
          {trailingText && <> {trailingText}</>}
        </p>
      </FullBleedLines>

      <FullBleedLines>
        <div className="relative w-full">
          <div className="bg-primary relative flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl px-4 py-8 md:flex-row md:items-center md:px-16 md:py-12">
            <form
              onSubmit={onSubmit}
              className="z-20 flex w-full flex-col items-start justify-center gap-6 md:w-[64%]"
            >
              <InlineHighlight className="bg-success md:self-end">
                <span className="font-heading text-foreground px-1 text-4xl leading-none font-bold tracking-tighter sm:text-5xl md:text-[64px]">
                  Contact us
                </span>
              </InlineHighlight>

              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <User className="text-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                    <Input
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={e => onChange('firstName', e.target.value)}
                      className="font-body border-border bg-background text-foreground placeholder:text-foreground focus:ring-success h-12 w-full rounded-none border pl-10 transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2"
                    />
                  </div>
                  <div className="relative flex-1">
                    <User className="text-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                    <Input
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={e => onChange('lastName', e.target.value)}
                      className="font-body border-border bg-background text-foreground placeholder:text-foreground focus:ring-success h-12 w-full rounded-none border pl-10 transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2"
                    />
                  </div>
                </div>

                <div className="relative w-full">
                  <Mail className="text-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={e => onChange('email', e.target.value)}
                    className="font-body border-border bg-background text-foreground placeholder:text-foreground focus:ring-success h-12 w-full rounded-none border pl-10 transition-all duration-300 ease-[var(--easing-smooth)] focus:ring-2 focus:ring-offset-2"
                  />
                </div>

                {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="group/cta active:ring-success/50 active:ring-offset-background inline-flex w-full origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
              >
                <span className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-12 flex-1 items-center justify-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-8">
                  {submitting ? 'Submitting…' : 'Book A Demo'}
                  <MoveUpRight className="ml-2 h-4 w-4" />
                </span>
                <span
                  className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-12 w-12 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                  aria-hidden="true"
                >
                  <MoveUpRight className="h-4 w-4" />
                </span>
              </Button>
            </form>

            <Image
              className="relative hidden h-full w-full object-cover pt-10 md:absolute md:top-0 md:right-0 md:flex md:h-full md:w-auto md:pt-0"
              width={1520}
              height={562}
              alt="vector"
              src="/img/contact-form.png"
            />
          </div>
        </div>
      </FullBleedLines>
    </div>
  );
}
