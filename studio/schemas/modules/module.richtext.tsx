import React from 'react';

import {
  COLOR_OPTIONS,
  ColorType,
} from '../../../components/module/BackgroundOptions';
import { RichTextProps } from '../../../modules/RichText/RichText';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { blocksToText } from '../../utils/portableText/portableTextToText';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof RichTextProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'module.richtext',
  title: 'Rich text',
  type: 'object',
  icon: () => <DocumentIcon type="page" />,
  initialValue: {
    background: 'white',
  },
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
  groups: [
    {
      name: 'presentation',
      title: 'Presentation',
    },
  ],
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'richtext.full',
    },
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
