import { SitemapItemType, SitemapType } from '../../queries/sitemap';
import { getItemForPath } from './getItemForPath';

export const getBreadCrumbForPath = (
  path: string,
  sitemap: SitemapType,
): SitemapItemType[] => {
  const pathParts = path
    .split('/')
    .slice(1) // remove homepage
    .reduce((prev, curr) => [...prev, `${prev}/${curr}`], []); // create array of paths for every item ['/a', '/a/b', '/a/b/c']

  return pathParts
    .map((pathPart) => getItemForPath(`${pathPart}`, sitemap))
    .filter(Boolean);
};
