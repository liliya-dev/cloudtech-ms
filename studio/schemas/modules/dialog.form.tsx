import React from 'react';

import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';

type SchemaType = SanitySchemaType & {
  type: 'object';
  fields: ({
    name: 'form' | 'slug';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'dialog.form',
  title: 'Form',
  type: 'object',
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      title: 'form.name',
    },
    prepare({ title = '' }) {
      return {
        title: `Form: ${title}`,
      };
    },
  },
  fields: [
    {
      name: 'slug',
      title: 'Identifier',
      type: 'slug',
      validation: validate({ required: true }),
      description:
        'Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -',
    },
    {
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form.static' }],
    },
  ],
};

export default schema;
