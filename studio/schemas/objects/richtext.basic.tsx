import React from 'react';

import { CustomRichTextEditor } from '../../components/CustomRichTextEditor';

export default {
  name: 'richtext.basic',
  title: 'Rich Text',
  type: 'array',
  inputComponent: CustomRichTextEditor,
  of: [
    {
      type: 'block',
      title: 'Rich text',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
        {
          title: 'Check',
          value: 'check',
          blockEditor: {
            icon: () => (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.5 2.5L2.21429 4L4.5 1" stroke="currentColor" />
                <path d="M0.5 7.5L2.21429 9L4.5 6" stroke="currentColor" />
                <path d="M0.5 12.5L2.21429 14L4.5 11" stroke="currentColor" />
                <line x1="7" y1="2.5" x2="15" y2="2.5" stroke="currentColor" />
                <line x1="7" y1="7.5" x2="15" y2="7.5" stroke="currentColor" />
                <line x1="7" y1="12.5" x2="15" y2="12.5" stroke="currentColor" />
              </svg>
            ),
          },
        },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'link',
          },
        ],
      },
    },
  ],
};
