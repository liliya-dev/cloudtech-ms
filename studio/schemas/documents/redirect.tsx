import React from 'react';

import { SchemaName } from '../../../types.sanity';
import Warning from '../../components/Warning';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';

export const SCHEMA_NAME: SchemaName = 'redirect';

export default {
  name: SCHEMA_NAME,
  type: 'document',
  title: 'Redirect',
  icon: () => <DocumentIcon type="redirect" />,
  fields: [
    {
      name: 'warning',
      title: 'Warning',
      type: 'string',
      inputComponent: Warning,
      message:
        'Publishing a redirect will trigger a new deployment on the build server and will take a few minutes to be in effect.',
    },
    {
      title: 'Description',
      name: 'description',
      description:
        'Human readable description, used only to easily identify redirects',
      type: 'string',
    },
    {
      title: 'Source',
      name: 'source',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((name) => {
          if (typeof name === 'undefined') return true; // Allow undefined values

          if (name.startsWith('http') || name.startsWith('www'))
            return `The source must be relative, like /. Be sure not to include https:// or the domain.`;

          if (!name.startsWith('/'))
            return `The source must be relative, start with a /.`;

          return true;
        }),
      description: `URL that needs to be replaced. Host must be omitted (https://website.ie/). Examples: '/old-page', '/old-news/:slug' or '/old-sub-path/:slug*'.`,
    },
    {
      title: 'Destination',
      name: 'destination',
      type: 'string',
      validation: validate({ required: true }),
      description: `URL that needs to be replaced. Host can be omitted (https://website.ie/). Examples: '/new-page', '/new-news/:slug' or '/new-sub-path/:slug*'.`,
    },
    {
      name: 'permanent',
      title: 'Permanent',
      type: 'boolean',
      description:
        'Is this redirect permanent? If true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: 'description',
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
    },

    prepare: ({ title, source, destination, permanent }) => ({
      title,
      subtitle: `${source ?? 'no source'} -> ${destination ?? 'no destination'} ${
        permanent ? '(permanent)' : '(temporary)'
      }`,
    }),
  },
};
