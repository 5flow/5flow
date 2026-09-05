const WP_BASE = (process.env.WP_BASE_URL || 'https://cms.5flowtech.com').replace(/\/$/, '');
const WP_TOKEN = process.env.WP_API_TOKEN as string | undefined;
const WP_BASIC_USER = process.env.WP_BASIC_AUTH_USER as string | undefined;
const WP_BASIC_PASS = process.env.WP_BASIC_AUTH_PASS as string | undefined;

export async function wpFetch(path: string, init: RequestInit = {}) {
  const url = `${WP_BASE}${path}`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (WP_TOKEN) {
    headers['Authorization'] = `Bearer ${WP_TOKEN}`;
  } else if (WP_BASIC_USER && WP_BASIC_PASS) {
    const basic = Buffer.from(`${WP_BASIC_USER}:${WP_BASIC_PASS}`).toString('base64');
    headers['Authorization'] = `Basic ${basic}`;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        ...headers,
        ...(init.headers || {}),
      },
      signal: init.signal || controller.signal,
      cache: 'no-store',
    } as RequestInit);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`WP fetch failed ${res.status} ${url} ${text}`);
    }
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  } finally {
    clearTimeout(timeout);
  }
}
