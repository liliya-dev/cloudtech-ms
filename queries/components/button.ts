import groq from 'groq';

export const resolveIdHrefQuery = `$sitemap[_id == ^._id][0].path`;

export const buttonHrefQuery = groq`coalesce(external, $sitemap[_id == ^.internal._ref][0].path, '#'+ dialog, file.asset->url) + coalesce(params, '')`;

export const buttonFieldsQuery = groq`
  "href": ${buttonHrefQuery},
  label,
  size,
  theme,
  align,
  plain,
  compact,
  stretch,
  icon,
  iconPosition,
  download
`;

export const buttonQuery = groq`{
  ${buttonFieldsQuery}
}`;

export const buttonWithChildrenQuery = groq`
{
  ${buttonFieldsQuery},
  children[] ${buttonQuery}
}`;

export const hrefFieldQuery = groq`
  "href": link ${buttonQuery}.href
`;
