import { NextRequest, NextResponse } from 'next/server';
import {
  createOrUpdateHubSpotPodcastNotificationLead,
  PodcastNotificationPayload,
} from '@/lib/hubspot';

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data: PodcastNotificationPayload = {
      email: (body.email || '').toString().trim(),
      formType: 'Podcast notification newsletter',
      sourcePage: body.sourcePage ? body.sourcePage.toString().trim() : undefined,
      sourceUrl: body.sourceUrl ? body.sourceUrl.toString().trim() : undefined,
      referrer: body.referrer ? body.referrer.toString().trim() : undefined,
    };

    if (!data.email) return badRequest('Email is required');
    if (!isValidEmail(data.email)) return badRequest('Enter a valid email');

    const result = await createOrUpdateHubSpotPodcastNotificationLead(data);

    return NextResponse.json({ ok: true, result });
  } catch (err: unknown) {
    console.error('Podcast notification submission failed', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to submit podcast notification', detail: message }, { status: 500 });
  }
}
