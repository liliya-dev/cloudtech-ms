import React from 'react';

import { iconNames } from '../../../components/icons/Icons';
import { SchemaName } from '../../../types.sanity';
import IconPicker from '../../components/IconPicker';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';
import buttonSchema from '../objects/button';

export const SCHEMA_NAME: SchemaName = 'navigation';

const LABEL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === 'label')[0],
};

const INTERNAL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === 'internal')[0],
  hidden: ({ parent, value }) => !value && parent?.external,
};

const EXTERNAL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === 'external')[0],
  hidden: ({ parent, value }) => !value && parent?.internal,
};

const PREVIEW = {
  preview: {
    select: {
      label: 'label',
      external: 'external',
      children: 'children',
    },
    prepare({ label, children = [], external }) {
      return {
        title: label || '[Empty]',
        subtitle: external
          ? external
          : children?.map(({ label }) => label).join(', '),
        media: label?.trim().length ? (
          <DocumentIcon type="link" />
        ) : (
          <DocumentIcon type="warning" />
        ),
      };
    },
  },
};

export default {
  name: SCHEMA_NAME,
  title: 'Navigation',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="navigation" />,
  initialValue: {},
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: validate({ required: true }),
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          ...PREVIEW,
          fields: [
            LABEL_FIELD,
            INTERNAL_FIELD,
            EXTERNAL_FIELD,
            {
              name: 'children',
              title: 'Submenu',
              type: 'array',
              description:
                'List of submenu buttons. Be sure not to add an internal or external link when adding a submenu.',
              of: [
                {
                  type: 'object',
                  title: 'Submenu',
                  ...PREVIEW,
                  fields: [
                    LABEL_FIELD,
                    {
                      ...INTERNAL_FIELD,
                      hidden: ({ parent, value }) => !value && parent?.external,
                    },
                    {
                      ...EXTERNAL_FIELD,
                      hidden: ({ parent, value }) => !value && parent?.internal,
                    },
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
          ],
        },
      ],
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'button' }],
    },
  ],
};
