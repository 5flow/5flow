export type DownloadLeadPayload = {
  firstName?: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  consentContact?: boolean;
  downloadedResource: string;
  downloadedResourceUrl: string;
  sourcePage?: string;
  sourceUrl?: string;
  referrer?: string;
};

type HubSpotContactResponse = {
  id: string;
  properties?: Record<string, string | null>;
};

const HUBSPOT_CONTACT_PROPERTIES = {
  downloadedResource: 'n5flow_downloaded_resource',
  downloadedResourceUrl: 'n5flow_downloaded_resource_url',
  leadSourcePage: 'n5flow_lead_source_page',
  referrer: 'n5flow_referrer',
} as const;

function getHubSpotToken() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Missing HubSpot env var: HUBSPOT_ACCESS_TOKEN');
  }
  return token;
}

function buildContactProperties(payload: DownloadLeadPayload) {
  return Object.fromEntries(
    Object.entries({
      firstname: payload.firstName || undefined,
      lastname: payload.lastName,
      email: payload.email,
      company: payload.company,
      country: payload.country,
      [HUBSPOT_CONTACT_PROPERTIES.downloadedResource]: payload.downloadedResource,
      [HUBSPOT_CONTACT_PROPERTIES.downloadedResourceUrl]: payload.downloadedResourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.leadSourcePage]: payload.sourcePage || payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.referrer]: payload.referrer || undefined,
    }).filter(([, value]) => value !== undefined && value !== ''),
  );
}

async function hubSpotFetch(path: string, init: RequestInit) {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getHubSpotToken()}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  return { res, json };
}

export async function createOrUpdateHubSpotDownloadLead(payload: DownloadLeadPayload) {
  const properties = buildContactProperties(payload);

  const update = await hubSpotFetch(`/crm/v3/objects/contacts/${encodeURIComponent(payload.email)}?idProperty=email`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });

  if (update.res.ok) {
    return update.json as HubSpotContactResponse;
  }

  if (update.res.status !== 404) {
    throw new Error(`HubSpot contact update failed: ${update.res.status} ${JSON.stringify(update.json)}`);
  }

  const create = await hubSpotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({ properties }),
  });

  if (!create.res.ok) {
    throw new Error(`HubSpot contact create failed: ${create.res.status} ${JSON.stringify(create.json)}`);
  }

  return create.json as HubSpotContactResponse;
}
