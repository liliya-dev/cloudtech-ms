import groq from 'groq';

import { SchemaName } from '../types.sanity';

export type SitemapItemType = {
  _id: string;
  _type: SchemaName;
  title: string;
  path: string;
  _updatedAt: string;
  excludeFromSitemap?: boolean;
};

export type SitemapType = SitemapItemType[];

const baseFields = groq`_id, _type, title, _updatedAt, "excludeFromSitemap": seo.excludeFromSitemap`;
const slugFields = groq`${baseFields}, "path": "/"+ slug.current,`;

const homePageQuery = groq`
*[_id match "*page_homepage"] { 
  ${baseFields},
  "path": "/",
}[0]`;

const getSingletonQuery = (id: string) => {
  return `*[_id match "*${id}"] { ${slugFields} }[0]`;
};

const getSlugPageQuery = (type: SchemaName) => {
  return `...*[_type == "${type}"] { ${slugFields} }`;
};

export const sitemapQuery = groq`
[
  ${homePageQuery},

  // content pages
  ...*[_type == "page.content" || _type == "page.landing"] {
    ${baseFields},
    "level0": slug.current,
    "level1": parent -> slug.current,
    "level2": parent -> parent -> slug.current,
    "level3": parent -> parent -> parent -> slug.current,
    "level4": parent -> parent -> parent -> parent -> slug.current,
  }
  {
  ${baseFields},
  excludeFromSitemap,
  "path": select(
    defined(level4) => "/"+ level4 +"/"+ level3 +"/"+ level2 +"/"+ level1 +"/"+ level0,
    defined(level3) => "/"+ level3 +"/"+ level2 +"/"+ level1 +"/"+ level0,
    defined(level2) => "/"+ level2 +"/"+ level1 + "/"+ level0,
    defined(level1) => "/"+ level1 +"/"+ level0,
    defined(level0) => "/"+ level0,
    "/"
  )
}]
`;
