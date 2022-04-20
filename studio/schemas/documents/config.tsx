import React from 'react';

import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';

export const SCHEMA_NAME: SchemaName = 'config';

export const SEO_FIELD = {
  name: 'seo',
  title: 'Seo',
  type: 'object',
  fieldset: 'metadata',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Around 55-60 characters long.',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Around 150-160 characters long.',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excludeFromSitemap',
      title: 'Exclude from sitemap',
      type: 'boolean',
      description: 'Option to exclude from sitemap',
      initialValue: false,
    },
  ],
};

export default {
  name: SCHEMA_NAME,
  title: 'Config',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="config" />,
  initialValue: {},
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'Name of the website. Used in the page title and brand schema as brand name.',
      validation: validate({ required: true }),
    },
    {
      name: 'domain',
      type: 'string',
      title: 'Domain',
      validation: validate({ required: true }),
      description:
        'The website domain without slash and protocol, e.g google.com. Used for the canonical url.',
    },
    { ...SEO_FIELD, fieldset: null },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'object',
      fields: [
        {
          name: 'handle',
          title: 'Handle',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'gtmid',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'Formatted as `GTM-XXXXXX`.',
    },
  ],
};
