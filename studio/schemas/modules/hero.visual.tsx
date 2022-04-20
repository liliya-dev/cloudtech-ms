import React from 'react';

import { ColorType } from '../../../components/module/BackgroundOptions';
import { HeroProps } from '../../../heroes/Hero';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { blocksToText } from '../../utils/portableText/portableTextToText';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    background?: ColorType;
  };
  fields: ({
    name: keyof HeroProps | 'cloudinaryVideo' | 'form';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'hero.visual',
  title: 'Hero visual',
  type: 'object',
  icon: () => <DocumentIcon type="image" />,
  initialValue: {
    background: 'black',
  },
  preview: {
    select: {
      title: 'title',
      intro: 'intro',
      image: 'image.source',
      cloudinaryPoster: 'video.cloudinary.url',
    },
    prepare({ title = '', intro = [], image, cloudinaryPoster }) {
      return {
        title: title,
        subtitle: blocksToText(intro),
        media: cloudinaryPoster ? (
          <img src={cloudinaryPoster.replace('.mp4', '.jpg')} />
        ) : (
          image
        ),
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
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'richtext.basic',
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'buttongroup',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image.simple',
    },
    {
      title: 'Video',
      type: 'video',
      name: 'video',
    },
    {
      name: 'background',
      title: 'Background',
      type: 'backgroundColor',
      group: 'presentation',
    },
    {
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form.static' }],
    },
  ],
};

export default schema;
