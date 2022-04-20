import React from 'react';

import { DocumentIcon } from '../../utils/DocumentIcon';
import { blocksToText } from '../../utils/portableText/portableTextToText';

export const schema = {
  name: 'accordion',
  title: 'Accordion',
  type: 'array',
  of: [
    {
      name: 'item',
      title: 'Item',
      type: 'object',
      preview: {
        select: {
          title: 'title',
          content: 'content',
        },
        prepare({ title, content = [] }) {
          return {
            title: `${title}`,
            subtitle: blocksToText(content),
            media: <DocumentIcon type="list" />,
          };
        },
      },
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'richtext.full',
        },
      ],
    },
  ],
};

export default schema;
