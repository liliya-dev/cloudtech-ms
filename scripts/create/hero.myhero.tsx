import React from 'react';

import { MyHeroProps } from '../../../heroes/MyHero';
import { ColorType, COLOR_OPTIONS } from '../../../heroes/MyHeroOptions';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof MyHeroProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'MyHeroSchema',
  title: 'MyHero',
  type: 'object',
  icon: () => <DocumentIcon type="image" />,
  initialValue: {
    background: 'black',
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `${title}`,
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
    /*FIELDS*/
    {
      name: 'background',
      title: 'Background',
      type: 'backgroundColor',
      group: 'presentation',
      options: {
        list: optionsToList(COLOR_OPTIONS),
      },
    },
  ],
};

export default schema;
