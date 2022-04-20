import { SitemapType } from '../../queries/sitemap';

export const getIdForPath = (path: string, sitemap: SitemapType): string => {
  return sitemap.find((item) => item.path === path)?._id || '';
};
