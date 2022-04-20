import React from 'react';

import { ColorType } from '../../../components/module/BackgroundOptions';
import { VideoProps } from '../../../modules/Video/Video';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { getVideoPreview } from '../objects/video';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof VideoProps;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'module.video',
  title: 'Video',
  type: 'object',
  icon: () => <DocumentIcon type="video" />,
  initialValue: {
    background: 'white',
  },
  preview: getVideoPreview('video.'),
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
      name: 'intro',
      title: 'Intro',
      type: 'richtext.simple',
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'buttongroup',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'video',
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
