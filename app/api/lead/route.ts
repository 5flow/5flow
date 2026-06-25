import { NextRequest, NextResponse } from 'next/server';
import { createZohoLead, LeadPayload } from '@/lib/zoho';

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function normalizePhone(body: Record<string, unknown>) {
  const phoneCountryCode = body.phoneCountryCode ? body.phoneCountryCode.toString().trim() : '';
  const phone = body.phone ? body.phone.toString().trim() : '';

  if (phoneCountryCode && phone && !phone.startsWith('+')) {
    return `${phoneCountryCode} ${phone}`;
  }

  return phone;
}

function isValidPhone(phone: string) {
  const digitCount = phone.replace(/\D/g, '').length;
  return digitCount >= 7 && digitCount <= 18 && /^\+\d[\d-]*\s+[0-9\s().-]+$/.test(phone);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = normalizePhone(body);

    const data: LeadPayload = {
      firstName: (body.firstName || '').toString().trim() || undefined,
      lastName: (body.lastName || '').toString().trim(),
      email: (body.email || '').toString().trim(),
      phone,
      company: (body.company || '').toString().trim(),
      position: body.position ? body.position.toString().trim() : undefined,
      zip: body.zip ? body.zip.toString().trim() : undefined,
      country: (body.country || '').toString().trim(),
      requestType: (body.requestType || '').toString().trim(),
      message: body.message ? body.message.toString() : undefined,
      consentContact: Boolean(body.consentContact),
      consentMarketing: Boolean(body.consentMarketing),
      sourcePage: body.sourcePage ? body.sourcePage.toString().trim() : undefined,
      sourceUrl: body.sourceUrl ? body.sourceUrl.toString().trim() : undefined,
      referrer: body.referrer ? body.referrer.toString().trim() : undefined,
    };

    // Basic validation
    if (!data.lastName) return badRequest('Last name is required');
    if (!data.email) return badRequest('Email is required');
    if (!data.phone) return badRequest('Phone number is required');
    if (!data.company) return badRequest('Company is required');
    if (!data.country) return badRequest('Country is required');
    if (!body.consentPrivacy) return badRequest('Privacy consent is required');
    if (!data.requestType) return badRequest('Type of request is required');

    // Optional: very loose email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return badRequest('Enter a valid email');
    }

    // Enforce work email (no common free providers)
    const domain = data.email.split('@')[1]?.toLowerCase() || '';
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
    if (freeDomains.has(domain)) {
      return badRequest('Please use your work email (no Gmail/Yahoo/etc.)');
    }
    if (!isValidPhone(data.phone)) return badRequest('Enter a valid phone number with country code');

    const result = await createZohoLead(data);

    return NextResponse.json({ ok: true, result });
  } catch (err: unknown) {
    console.error('Lead submission failed', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to submit lead', detail: message }, { status: 500 });
  }
}
