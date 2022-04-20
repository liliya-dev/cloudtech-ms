import sanityClient from 'part:@sanity/base/client';
import React from 'react';

import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import {
  DIALOGS_FIELD,
  HERO_FIELD,
  MODULES_FIELD,
  pageBase,
  SLUG_FIELD,
  TITLE_FIELD,
} from './_page';
import { SEO_FIELD } from './config';

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' });

export const SCHEMA_NAME: SchemaName = 'page.content';

export default {
  name: SCHEMA_NAME,
  title: 'Content page',
  type: 'document',
  icon: () => <DocumentIcon type="page" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{ type: 'page.content' }, { type: 'page.landing' }],
    },
    TITLE_FIELD,
    SEO_FIELD,
    {
      ...SLUG_FIELD,
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, options) => {
          const { document } = options;
          const id = document._id.replace(/^drafts\./, '');

          if (!document.parent?._ref) {
            return client.fetch(
              `!defined(*[!(_id in [$draft, $published]) && slug.current == "$slug"][0]._id)`,
              {
                type: SCHEMA_NAME,
                draft: `drafts.${id}`,
                published: id,
                slug,
              },
            );
          }

          return client.fetch(
            `!defined(*[!(_id in [$draft, $published]) && (_type == $type || _type == 'page.landing') && parent._ref == $parent && slug.current == "$slug"][0]._id)`,
            {
              type: SCHEMA_NAME,
              parent: document.parent._ref,
              draft: `drafts.${id}`,
              published: id,
              slug,
            },
          );
        },
      },
    },
    HERO_FIELD,
    MODULES_FIELD,
    DIALOGS_FIELD,
  ],
};
