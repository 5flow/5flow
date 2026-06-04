export type DownloadLeadPayload = {
  email: string;
  formType: string;
  consentContact?: boolean;
  downloadedResource: string;
  downloadedResourceUrl: string;
  sourcePage?: string;
  sourceUrl?: string;
  referrer?: string;
};

export type WebsiteLeadPayload = {
  firstName?: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  position?: string;
  zip?: string;
  country: string;
  requestType: 'Demo' | 'General information' | 'Other' | string;
  message?: string;
  consentContact?: boolean;
  sourcePage?: string;
  sourceUrl?: string;
  referrer?: string;
};

type HubSpotContactResponse = {
  id: string;
  properties?: Record<string, string | null>;
};

const HUBSPOT_CONTACT_PROPERTIES = {
  formType: 'n5flow_form_type',
  formSourceUrl: 'n5flow_form_source_url',
  formSourcePage: 'n5flow_form_source_page',
  formReferrer: 'n5flow_form_referrer',
  consentToContact: 'n5flow_consent_to_contact',
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
      email: payload.email,
      [HUBSPOT_CONTACT_PROPERTIES.formType]: payload.formType,
      [HUBSPOT_CONTACT_PROPERTIES.formSourceUrl]: payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.formSourcePage]: payload.sourcePage || payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.formReferrer]: payload.referrer || undefined,
      [HUBSPOT_CONTACT_PROPERTIES.consentToContact]: payload.consentContact === true ? 'true' : 'false',
      [HUBSPOT_CONTACT_PROPERTIES.downloadedResource]: payload.downloadedResource,
      [HUBSPOT_CONTACT_PROPERTIES.downloadedResourceUrl]: payload.downloadedResourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.leadSourcePage]: payload.sourcePage || payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.referrer]: payload.referrer || undefined,
    }).filter(([, value]) => value !== undefined && value !== '')
  );
}

function buildWebsiteLeadProperties(payload: WebsiteLeadPayload) {
  return Object.fromEntries(
    Object.entries({
      firstname: payload.firstName || undefined,
      lastname: payload.lastName,
      email: payload.email,
      phone: payload.phone || undefined,
      company: payload.company,
      jobtitle: payload.position || undefined,
      zip: payload.zip || undefined,
      country: payload.country,
      [HUBSPOT_CONTACT_PROPERTIES.formType]: payload.requestType,
      [HUBSPOT_CONTACT_PROPERTIES.formSourceUrl]: payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.formSourcePage]: payload.sourcePage || payload.sourceUrl,
      [HUBSPOT_CONTACT_PROPERTIES.formReferrer]: payload.referrer || undefined,
      [HUBSPOT_CONTACT_PROPERTIES.consentToContact]: payload.consentContact === true ? 'true' : 'false',
      n5flow_form_message: buildWebsiteLeadMessage(payload),
    }).filter(([, value]) => value !== undefined && value !== '')
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

export async function createOrUpdateHubSpotWebsiteLead(payload: WebsiteLeadPayload) {
  const properties = buildWebsiteLeadProperties(payload);

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

function buildWebsiteLeadMessage(payload: WebsiteLeadPayload) {
  const lines = [
    payload.message ? `Message: ${payload.message}` : undefined,
    payload.requestType ? `Request Type: ${payload.requestType}` : undefined,
    payload.zip ? `ZIP: ${payload.zip}` : undefined,
    payload.sourcePage ? `Source Page: ${payload.sourcePage}` : undefined,
    payload.sourceUrl ? `Source URL: ${payload.sourceUrl}` : undefined,
    payload.referrer ? `Referrer: ${payload.referrer}` : undefined,
  ].filter(Boolean);

  return lines.join('\n');
}
