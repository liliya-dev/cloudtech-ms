import { SitemapItemType, SitemapType } from '../../queries/sitemap';

export const getItemForPath = (
  path: string,
  sitemap: SitemapType,
): SitemapItemType | null => {
  return sitemap.find((item) => item.path === path);
};
