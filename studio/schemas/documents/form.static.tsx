import React from 'react';

import { STATIC_FORMS, STATIC_FORM_OPTIONS } from '../../../types';
import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { validate } from '../../utils/validate';

export const SCHEMA_NAME: SchemaName = 'form.static';

export default {
  name: SCHEMA_NAME,
  title: 'Static form',
  type: 'document',
  icon: () => <DocumentIcon type="form" />,
  initialValue: {},
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the form used to identify it in the cms.',
      validation: validate({ required: true }),
    },
    {
      name: 'formId',
      title: 'Form id',
      type: 'string',
      validation: validate({ required: true }),
      options: {
        direction: 'horizontal',
        list: optionsToList(STATIC_FORMS),
      },
    },
    {
      name: 'success',
      title: 'Success message',
      type: 'richtext.simple',
      rows: 2,
    },
    {
      name: 'error',
      title: 'Error message',
      type: 'richtext.simple',
      rows: 2,
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'options',
          title: 'Options',
          icon: () => <DocumentIcon type="form" />,
          preview: {
            select: {
              title: 'key',
              subtitle: 'value',
            },
          },
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              options: {
                list: optionsToList(STATIC_FORM_OPTIONS),
              },
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
