import { SitemapType } from '../../queries/sitemap';

export const getPathForId = (id: string, sitemap: SitemapType): string => {
  return sitemap.find((item) => item._id === id)?.path || '';
};
