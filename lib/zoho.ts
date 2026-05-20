const memoryToken: { accessToken?: string; expiresAt?: number } = {};

function accountsBase(dc: string) {
  const map: Record<string, string> = {
    us: 'https://accounts.zoho.com',
    eu: 'https://accounts.zoho.eu',
    in: 'https://accounts.zoho.in',
    au: 'https://accounts.zoho.com.au',
    jp: 'https://accounts.zoho.jp',
    ca: 'https://accounts.zohocloud.ca',
  };
  return map[dc] || map.us;
}

function apiBase(dc: string) {
  const map: Record<string, string> = {
    us: 'https://www.zohoapis.com',
    eu: 'https://www.zohoapis.eu',
    in: 'https://www.zohoapis.in',
    au: 'https://www.zohoapis.com.au',
    jp: 'https://www.zohoapis.jp',
    ca: 'https://www.zohoapis.ca',
  };
  return map[dc] || map.us;
}

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

async function refreshAccessToken(): Promise<string> {
  const dc = process.env.ZOHO_DATA_CENTER?.toLowerCase() || 'us';
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Zoho OAuth env vars: ZOHO_CLIENT_ID/SECRET/REFRESH_TOKEN');
  }

  // If cached and valid for > 60s, reuse
  const now = Date.now();
  if (memoryToken.accessToken && memoryToken.expiresAt && memoryToken.expiresAt - now > 60_000) {
    return memoryToken.accessToken;
  }

  const url = `${accountsBase(dc)}/oauth/v2/token`;
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    // No caching by Next
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoho token refresh failed: ${res.status} ${text}`);
  }

  const json: TokenResponse = (await res.json()) as TokenResponse;
  const accessToken = json.access_token;
  const expiresIn = Number(json.expires_in) || 3600;
  memoryToken.accessToken = accessToken;
  memoryToken.expiresAt = Date.now() + expiresIn * 1000;
  return accessToken;
}

export type LeadPayload = {
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
  consentContact?: boolean; // user opted-in to be contacted
  sourcePage?: string;
  sourceUrl?: string;
  referrer?: string;
};

type ZohoLeadRecord = {
  Last_Name: string;
  First_Name?: string;
  Email: string;
  Phone?: string;
  Company: string;
  Designation?: string;
  Zip_Code?: string;
  Country: string;
  Lead_Source?: string;
  Description?: string;
  Email_Opt_Out?: boolean;
  Website_Source_URL?: string;
};

type ZohoCreateResponse = {
  data: Array<{
    code: string;
    details: Record<string, unknown>;
    message: string;
    status: 'success' | 'error';
  }>;
};

export async function createZohoLead(payload: LeadPayload) {
  const dc = process.env.ZOHO_DATA_CENTER?.toLowerCase() || 'us';
  const base = apiBase(dc);
  const token = await refreshAccessToken();

  // Map to Zoho standard field API names
  const record: Partial<ZohoLeadRecord> = {
    Last_Name: payload.lastName,
    First_Name: payload.firstName || undefined,
    Email: payload.email,
    Phone: payload.phone || undefined,
    Company: payload.company,
    Designation: payload.position || undefined,
    Zip_Code: payload.zip || undefined,
    Country: payload.country,
    Lead_Source: payload.requestType || 'Website',
    Description: buildDescription(payload),
    Email_Opt_Out: payload.consentContact === true ? false : true,
    Website_Source_URL: payload.sourceUrl || undefined,
  };

  // Remove undefined fields without mutating types
  const pruned = Object.fromEntries(Object.entries(record).filter(([, v]) => v !== undefined)) as ZohoLeadRecord;

  const res = await fetch(`${base}/crm/v6/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [pruned], trigger: ['approval', 'workflow', 'blueprint'] }),
    cache: 'no-store',
  });

  const json: ZohoCreateResponse = (await res.json()) as ZohoCreateResponse;
  if (!res.ok || json?.data?.[0]?.status !== 'success') {
    throw new Error(`Zoho lead create failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

function buildDescription(p: LeadPayload) {
  const lines = [
    p.message ? `Message: ${p.message}` : undefined,
    p.requestType ? `Request Type: ${p.requestType}` : undefined,
    p.zip ? `ZIP: ${p.zip}` : undefined,
    p.sourcePage ? `Source Page: ${p.sourcePage}` : undefined,
    p.sourceUrl ? `Source URL: ${p.sourceUrl}` : undefined,
    p.referrer ? `Referrer: ${p.referrer}` : undefined,
  ].filter(Boolean);
  return lines.join('\n');
}
