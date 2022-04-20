import React from 'react';

import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { validate } from '../../utils/validate';
import { getVideoPreview } from '../objects/video';

type SchemaType = SanitySchemaType & {
  type: 'object';
  fields: ({
    name: 'video' | 'slug';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'dialog.video',
  title: 'Video Dialog',
  type: 'object',
  icon: () => <DocumentIcon type="video" />,
  preview: getVideoPreview('video.'),
  fields: [
    {
      name: 'slug',
      title: 'Identifier',
      type: 'slug',
      validation: validate({ required: true }),
      description:
        'Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'video',
    },
  ],
};

export default schema;
