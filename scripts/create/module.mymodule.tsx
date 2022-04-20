import React from 'react';

import { MyModuleProps } from '../../../modules/MyModule/MyModule';
import { ColorType, COLOR_OPTIONS } from '../../../modules/MyModule/MyModuleOptions';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof MyModuleProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'MyModuleSchema',
  title: 'MyModuleTitle',
  type: 'object',
  icon: () => <DocumentIcon type="page" />,
  initialValue: {
    background: 'white',
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'MyModuleTitle' }) {
      return {
        title: title,
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
