import client from 'part:@sanity/base/client';

export const isSlugUnique = (slug, options) => {
  const { document } = options;

  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: document._type,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && _type == $type && slug.current == $slug][0]._id)`;

  return client.fetch(query, params);
};
