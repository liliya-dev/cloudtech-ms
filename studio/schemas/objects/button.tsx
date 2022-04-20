import React from 'react';

import { ButtonProps } from '../../../components/buttons/Button';
import {
  COLOR_OPTIONS,
  ALIGN_OPTIONS,
  SIZE_OPTIONS,
  ColorType,
  AlignType,
  SizeType,
  ICON_POSITION_OPTIONS,
  IconPositionType,
} from '../../../components/buttons/ButtonOptions';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import ColorSwatches from '../../components/ColorSwatches';
import DialogSelect from '../../components/DialogSelect';
import IconPicker from '../../components/IconPicker';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { getLinkableTypes } from '../../utils/schemas/getLinkableTypes';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    theme?: ColorType;
    size?: SizeType;
    align?: AlignType;
    iconPosition?: IconPositionType;
  };
  fields: ({
    name: keyof ButtonProps | 'external' | 'internal' | 'dialog' | 'params' | 'file';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'button',
  title: 'Button',
  type: 'object',
  initialValue: {
    theme: 'white',
    size: 'lg',
    align: 'left',
    iconPosition: 'after',
  },
  groups: [
    {
      name: 'presentation',
      title: 'Presentation',
    },
  ],
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'external',
      title: 'External link',
      description: 'Link to a website, e.g https://www.example.com.',
      type: 'string',
      hidden: ({ parent, value }) =>
        !value && (parent?.internal || parent?.dialog || parent?.file),
    },
    {
      name: 'internal',
      title: 'Internal link',
      type: 'reference',
      description: 'Internal link to a page or article.',
      to: getLinkableTypes(),
      hidden: ({ parent, value }) =>
        !value && (parent?.external || parent?.dialog || parent?.file),
    },
    {
      name: 'params',
      title: 'Extra url parameters',
      type: 'string',
      description:
        'Use this for a #hash or ?querystring. This field is not automatically updated when the destination changes.',
      hidden: ({ parent, value }) =>
        !value && (parent?.external || parent?.dialog || parent?.file),
      validation: (Rule) =>
        Rule.custom((value) => {
          if (typeof value === 'undefined') return true; // Allow undefined values
          if (!value.startsWith('#') && !value.startsWith('?'))
            return `This field must start with either # or ?.`;
          return true;
        }),
    },
    {
      name: 'dialog',
      title: 'Dialog',
      type: 'string',
      description: 'Open a dialog on this page',
      inputComponent: DialogSelect,
      hidden: ({ parent, value }) =>
        !value && (parent?.internal || parent?.external || parent?.file),
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      hidden: ({ parent, value }) =>
        !value && (parent?.external || parent?.dialog || parent?.internal),
    },
    {
      name: 'download',
      title: 'Download',
      type: 'boolean',
      initialValue: false,
      description: 'Make the button download the file',
      hidden: ({ parent, value }) => !value && !(parent?.file || parent?.external),
    },
    {
      name: 'theme',
      title: 'Color',
      type: 'string',
      group: 'presentation',
      inputComponent: ColorSwatches,
      options: {
        list: optionsToList(COLOR_OPTIONS),
      },
    },
    {
      name: 'align',
      title: 'Text alignment',
      type: 'string',
      group: 'presentation',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: optionsToList(ALIGN_OPTIONS),
      },
    },
    {
      name: 'stretch',
      title: 'Stretch',
      type: 'boolean',
      initialValue: false,
      group: 'presentation',
      description: 'Make the button stretch as wide as it can go.',
    },
    {
      name: 'plain',
      title: 'Plain',
      type: 'boolean',
      initialValue: false,
      group: 'presentation',
      description: 'Display the button as a link without a background color.',
    },
    {
      name: 'compact',
      title: 'Compact',
      type: 'boolean',
      initialValue: false,
      group: 'presentation',
      description: 'Remove padding from the button.',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'presentation',
      inputComponent: IconPicker,
    },
    {
      name: 'iconPosition',
      title: 'Icon position',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: optionsToList(ICON_POSITION_OPTIONS),
      },
      initialValue: 'after',
      group: 'presentation',
      description: 'Make the button stretch as wide as it can go.',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      group: 'presentation',
      options: {
        list: optionsToList(SIZE_OPTIONS),
      },
    },
  ],
  preview: {
    select: {
      label: 'label',
      external: 'external',
    },
    prepare({ label = '', external }) {
      return {
        title: label,
        subtitle: external ? external : null,
        media: <DocumentIcon type="link" />,
      };
    },
  },
};

export default schema;
