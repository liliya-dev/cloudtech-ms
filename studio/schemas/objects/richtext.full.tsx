import React from 'react';

import { DIRECTION_OPTIONS } from '../../../components/buttons/ButtonGroupOptions';
import { CustomRichTextEditor } from '../../components/CustomRichTextEditor';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import richTextBasicSchema from '../objects/richtext.basic';

export default {
  name: 'richtext.full',
  title: 'Rich Text',
  type: 'array',
  inputComponent: CustomRichTextEditor,
  of: [
    {
      type: 'block',
      title: 'Rich text',
      styles: [
        ...richTextBasicSchema.of[0].styles,
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H5', value: 'h5' },
      ].sort((a, b) => a.title.localeCompare(b.title)),
      lists: [...richTextBasicSchema.of[0].lists],
      marks: {
        decorators: [...richTextBasicSchema.of[0].marks.decorators],
        annotations: [...richTextBasicSchema.of[0].marks.annotations],
      },
    },
    { type: 'image.simple' },
    { type: 'video' },
    {
      name: 'accordion',
      title: 'Accordion',
      // TODO: this hidden prop should be a function that checks whether it's
      // already inside accordion. If so, return false.
      // This is not currently a Sanity feature for portable text
      hidden: false,
      type: 'object',
      fields: [{ type: 'accordion', name: 'items' }],
      preview: {
        select: {
          items: 'items',
        },
        prepare({ items }) {
          return {
            title: 'Accordion',
            subtitle: items?.map(({ title }) => title).join(', ') || '',
            media: <DocumentIcon type="list" />,
          };
        },
      },
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      groups: [
        {
          name: 'presentation',
          title: 'Presentation',
        },
      ],
      preview: {
        select: {
          items: 'items',
        },
        prepare({ items }) {
          return {
            title: 'Button group',
            subtitle: items?.map(({ label }) => label).join(', ') || '',
            media: <DocumentIcon type="link" />,
          };
        },
      },
      fields: [
        { type: 'buttongroup', name: 'items' },
        {
          name: 'direction',
          title: 'Direction',
          type: 'string',
          group: 'presentation',
          initialValue: 'horizontal',
          options: {
            layout: 'radio',
            direction: 'horizontal',
            list: optionsToList(DIRECTION_OPTIONS),
          },
        },
      ],
    },
  ],
};
