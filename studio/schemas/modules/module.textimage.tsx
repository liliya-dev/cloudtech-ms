import React from 'react';

import { ColorType } from '../../../components/module/BackgroundOptions';
import { TextImageProps } from '../../../modules/TextImage/TextImage';
import {
  AlignType,
  ALIGN_OPTIONS,
} from '../../../modules/TextImage/TextImageOptions';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { blocksToText } from '../../utils/portableText/portableTextToText';
import { getVideoPreview, getVideoPreviewThumbnail } from '../objects/video';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    align?: AlignType;
    background?: ColorType;
  };
  fields: ({
    name:
      | keyof TextImageProps
      | 'intro'
      | 'accordion'
      | 'contentgrid'
      | 'testimonialslider'
      | 'cloudinaryVideo';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'module.textimage',
  title: 'Text and Image',
  type: 'object',
  icon: () => <DocumentIcon type="textimage" />,
  initialValue: {
    align: 'right',
    background: 'white',
  },
  preview: {
    select: {
      title: 'title',
      intro: 'intro',
      image: 'image.source',
      provider: 'video.provider',
      ...getVideoPreview('video.').select,
    },
    prepare({
      title = '',
      intro = [],
      image,
      provider,
      cloudinary,
      muxPlaybackId,
      youtube,
    }) {
      const videoThumbnail = getVideoPreviewThumbnail({
        cloudinary,
        muxPlaybackId,
        youtube,
      });

      return {
        title: title,
        subtitle: blocksToText(intro),
        media: videoThumbnail ? (
          <img src={videoThumbnail} />
        ) : image ? (
          image
        ) : provider ? (
          <DocumentIcon type="video" />
        ) : null,
      };
    },
  },
  groups: [
    {
      name: 'media',
      title: 'Media',
    },
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
      name: 'image',
      title: 'Image',
      type: 'image.simple',
      group: 'media',
    },
    {
      title: 'Video',
      type: 'video',
      name: 'video',
      group: 'media',
    },
    {
      name: 'align',
      title: 'Align image',
      type: 'string',
      group: 'presentation',
      description: 'This places the image to the left and the text to the right',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: optionsToList(ALIGN_OPTIONS),
      },
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
