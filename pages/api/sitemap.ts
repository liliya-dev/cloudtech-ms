import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getClient } from '../../helpers/sanity/server';
import { SitemapItemType, sitemapQuery } from '../../queries/sitemap';

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  res.setHeader('Cache-Control', 's-maxage=86400');

  const data: SitemapItemType[] = await getClient(false).fetch(sitemapQuery);
  const items: string[] = data
    .filter(({ excludeFromSitemap }) => Boolean(excludeFromSitemap !== true))
    .map(
      ({ path, _updatedAt }) =>
        `
      <url>
        <loc>${process.env.SANITY_STUDIO_PROJECT_PATH.replace(
          /\/$/,
          '',
        )}${path}</loc>
        <lastmod>${new Date(_updatedAt).toISOString()}</lastmod>
      </url>
    `,
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items.join('\n')}
</urlset>
`;
  res.status(200).send(sitemap);
};

export default withSentry(handler);
