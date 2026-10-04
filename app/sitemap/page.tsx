import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/core/page-header';

export const metadata: Metadata = {
  title: 'Sitemap | 5Flow',
  description: 'Browse all public pages of the 5Flow website.',
};

async function findRoutes() {
  const appDir = path.join(process.cwd(), 'app');

  async function walk(dir: string, base = ''): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items = await Promise.all(
      entries.map(async ent => {
        const name = ent.name;
        // Skip special directories and files we don't want listed
        if (name.startsWith('(') || name.startsWith('_') || name === 'api') return [] as string[];
        const full = path.join(dir, name);
        const rel = path.join(base, name);
        if (ent.isDirectory()) {
          // If directory itself contains a page.tsx, add its route
          const pagePath = path.join(full, 'page.tsx');
          try {
            const stat = await fs.stat(pagePath);
            if (stat.isFile()) {
              const route = '/' + rel.replace(/\\/g, '/');
              return [route];
            }
          } catch {}
          return walk(full, rel);
        }
        return [] as string[];
      })
    );

    return items.flat();
  }

  const routes = await walk(appDir);

  // Add root route if app/page.tsx exists
  try {
    const rootPage = await fs.stat(path.join(appDir, 'page.tsx'));
    if (rootPage.isFile()) routes.unshift('/');
  } catch {}

  // Filter out special utility routes we don't want to show
  const filtered = Array.from(new Set(routes)).filter(r => r !== '/_not-found');

  return filtered.sort((a, b) => a.localeCompare(b));
}

export default async function SitemapPage() {
  const routes = await findRoutes();
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader cmsSlug="sitemap" title="sitemap" />
        <div className="mt-10 grid max-w-4xl gap-3 md:mt-16">
          {routes.map(route => (
            <div key={route}>
              <Link href={route} className="text-primary underline underline-offset-4">
                {route}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
