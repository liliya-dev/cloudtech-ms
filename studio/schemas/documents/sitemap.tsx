import React from 'react';

import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';
import { Sitemap } from '../../views/Sitemap';

export const SCHEMA_NAME: SchemaName = 'sitemap';

export default {
  name: SCHEMA_NAME,
  title: 'Sitemap',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="sitemap" />,
  initialValue: {},
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: validate({ required: true }),
    },
    {
      name: 'sitemap',
      title: 'Sitemap',
      type: 'string',
      inputComponent: Sitemap,
    },
  ],
};
