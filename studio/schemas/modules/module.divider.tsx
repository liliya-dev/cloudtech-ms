import React from 'react';

import { ColorType } from '../../../components/module/BackgroundOptions';
import { DividerProps } from '../../../modules/Divider/Divider';
import { SIZE_OPTIONS } from '../../../modules/Divider/DividerOptions';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof DividerProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'module.divider',
  title: 'Divider',
  type: 'object',
  icon: () => <DocumentIcon type="divider" />,
  initialValue: {
    background: 'white',
  },
  preview: {
    prepare() {
      return {
        title: 'divider',
      };
    },
  },
  fields: [
    {
      name: 'background',
      title: 'Background',
      type: 'backgroundColor',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        layout: 'radio',
        list: optionsToList(SIZE_OPTIONS),
      },
    },
  ],
};

export default schema;
