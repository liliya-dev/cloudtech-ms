import React from 'react';

import { ColorType } from '../../../components/module/BackgroundOptions';
import { AccordionProps } from '../../../modules/Accordion/Accordion';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof AccordionProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'module.accordion',
  title: 'Accordion',
  type: 'object',
  icon: () => <DocumentIcon type="list" />,
  initialValue: {
    background: 'white',
  },
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title = '', items = [] }) {
      return {
        title: title,
        subtitle: items?.map(({ title }) => title).join('\n'),
      };
    },
  },
  groups: [
    {
      name: 'presentation',
      title: 'Presentation',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'accordion',
    },
    {
      name: 'background',
      title: 'Background',
      type: 'backgroundColor',
      group: 'presentation',
    },
  ],
};

export default schema;
