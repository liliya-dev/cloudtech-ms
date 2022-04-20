import React from 'react';

import { iconNames } from '../../../components/icons/Icons';
import { SchemaName } from '../../../types.sanity';
import IconPicker from '../../components/IconPicker';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';
import buttonSchema from '../objects/button';

export const SCHEMA_NAME: SchemaName = 'footer';

const LABEL_FIELD = buttonSchema.fields.find(({ name }) => name === 'label');
const INTERNAL_FIELD = buttonSchema.fields.find(({ name }) => name === 'internal');
const EXTERNAL_FIELD = buttonSchema.fields.find(({ name }) => name === 'external');

const PREVIEW = {
  preview: {
    select: {
      title: 'title',
      label: 'label',
      external: 'external',
      items: 'items',
    },
    prepare({ title, label, items = [], external }) {
      return {
        title: title || label || '[Empty]',
        subtitle: external ? external : items?.map(({ label }) => label).join(', '),
        media: <DocumentIcon type="link" />,
      };
    },
  },
};

export default {
  name: SCHEMA_NAME,
  title: 'Footer',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="footer" />,
  initialValue: {},
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: validate({ required: true }),
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          ...PREVIEW,
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              description: 'List of menu buttons.',
              of: [
                {
                  type: 'object',
                  title: 'Items',
                  ...PREVIEW,
                  fields: [LABEL_FIELD, INTERNAL_FIELD, EXTERNAL_FIELD],
                },
              ],
              hidden: ({ parent, value }) =>
                !value && (parent?.internal || parent?.external),
            },
          ],
        },
      ],
    },
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Item',
          ...PREVIEW,
          fields: [
            LABEL_FIELD,
            INTERNAL_FIELD,
            EXTERNAL_FIELD,
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              inputComponent: IconPicker,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    },
    {
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form.static' }],
    },
  ],
};
