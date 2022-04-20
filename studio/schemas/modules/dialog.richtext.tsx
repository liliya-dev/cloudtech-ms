import React from 'react';

import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { blocksToText } from '../../utils/portableText/portableTextToText';
import { validate } from '../../utils/validate';

type SchemaType = SanitySchemaType & {
  type: 'object';
  fields: ({
    name: 'content' | 'slug';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'dialog.richtext',
  title: 'Rich Text Dialog',
  type: 'object',
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content = [] }) {
      return {
        title: blocksToText(content),
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
      name: 'content',
      title: 'Content',
      type: 'richtext.full',
    },
  ],
};

export default schema;
