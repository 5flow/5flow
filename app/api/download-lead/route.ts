import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateHubSpotDownloadLead, DownloadLeadPayload } from '@/lib/hubspot';

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data: DownloadLeadPayload = {
      firstName: body.firstName ? body.firstName.toString().trim() : undefined,
      lastName: (body.lastName || '').toString().trim(),
      email: (body.email || '').toString().trim(),
      company: (body.company || '').toString().trim(),
      country: (body.country || '').toString().trim(),
      consentContact: Boolean(body.consentContact),
      downloadedResource: (body.downloadedResource || '').toString().trim(),
      downloadedResourceUrl: (body.downloadedResourceUrl || '').toString().trim(),
      sourcePage: body.sourcePage ? body.sourcePage.toString().trim() : undefined,
      sourceUrl: body.sourceUrl ? body.sourceUrl.toString().trim() : undefined,
      referrer: body.referrer ? body.referrer.toString().trim() : undefined,
    };

    if (!data.lastName) return badRequest('Last name is required');
    if (!data.email) return badRequest('Work email is required');
    if (!isValidEmail(data.email)) return badRequest('Enter a valid email');
    if (!isWorkEmail(data.email)) return badRequest('Please use your work email (no Gmail/Yahoo/etc.)');
    if (!data.company) return badRequest('Company is required');
    if (!data.country) return badRequest('Country is required');
    if (!body.consentPrivacy) return badRequest('Privacy consent is required');
    if (!data.downloadedResource) return badRequest('Downloaded resource is required');
    if (!data.downloadedResourceUrl) return badRequest('Downloaded resource URL is required');

    const result = await createOrUpdateHubSpotDownloadLead(data);

    return NextResponse.json({ ok: true, result, downloadUrl: data.downloadedResourceUrl });
  } catch (err: unknown) {
    console.error('Download lead submission failed', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to submit download lead', detail: message }, { status: 500 });
  }
}
