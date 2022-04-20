import getYoutubeId from 'get-youtube-id';
import React from 'react';

import { VideoType, VIDEO_PROVIDERS } from '../../../types';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';

export const getVideoPreview = (prefix = '') => ({
  select: {
    caption: `${prefix}caption`,
    provider: `${prefix}provider`,
    staticFile: `${prefix}static`,
    cloudinary: `${prefix}cloudinary`,
    youtube: `${prefix}youtube`,
    video: `${prefix}video`,
    muxPlaybackId: `${prefix}mux.asset.playbackId`,
    vimeo: `${prefix}vimeo`,
    sanity: `${prefix}sanity`,
  },
  prepare({
    caption,
    staticFile,
    cloudinary,
    youtube,
    vimeo,
    muxPlaybackId,
    sanity,
  }) {
    const videoThumbnail = getVideoPreviewThumbnail({
      cloudinary,
      muxPlaybackId,
      youtube,
    });
    const videoTitle = getVideoPreviewTitle({
      caption,
      staticFile,
      cloudinary,
      youtube,
      vimeo,
      muxPlaybackId,
      sanity,
    });

    return {
      title: videoTitle,
      media: videoThumbnail ? <img src={videoThumbnail} alt="" /> : null,
    };
  },
});

export const getVideoPreviewTitle = ({
  caption,
  staticFile,
  cloudinary,
  youtube,
  vimeo,
  muxPlaybackId,
  sanity,
}) => {
  return `${[
    staticFile,
    sanity ? 'sanity video' : null,
    youtube,
    vimeo,
    muxPlaybackId ? 'mux video' : null,
    cloudinary?.url,
  ]
    .filter(Boolean)
    .join(', ')}${caption ? ` - ${caption}` : ''}`;
};

export const getVideoPreviewThumbnail = ({ cloudinary, muxPlaybackId, youtube }) => {
  let image = null;

  if (cloudinary) image = cloudinary.url?.replace('.mp4', '.jpg');
  if (muxPlaybackId)
    image = `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?&fit_mode=smartcrop&width=160&height=160`;

  if (youtube) image = `https://img.youtube.com/vi/${getYoutubeId(youtube)}/0.jpg`;

  /**
   * vimeo needs a json request first,
   * but that's not possible until we have
   * async prepare in sanity https://github.com/sanity-io/sanity/issues/2955
   */
  return image;
};

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    loop: VideoType['loop'];
    autoPlay: VideoType['autoPlay'];
  };
  fields: ({
    name: VideoType;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'video',
  title: 'Video',
  type: 'object',
  initialValue: {
    loop: false,
    autoPlay: false,
  },
  preview: getVideoPreview(),
  fieldsets: [
    {
      name: 'videoOptions',
      title: 'Video options',
      options: { collapsed: true, collapsable: true },
    },
  ],
  fields: [
    {
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: Object.keys(VIDEO_PROVIDERS),
      },
    },
    {
      title: 'Sanity',
      type: 'file',
      name: 'sanity',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'sanity',
    },
    {
      title: 'Cloudinary Video',
      type: 'cloudinary.asset',
      name: 'cloudinary',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'cloudinary',
    },
    {
      title: 'Youtube URL',
      type: 'url',
      name: 'youtube',
      description:
        'Link of the Youtube video, e.g https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'youtube',
    },
    {
      title: 'Vimeo URL',
      type: 'url',
      name: 'vimeo',
      description: 'Link of the Vimeo video, e.g https://vimeo.com/1084537',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'vimeo',
    },
    {
      title: 'Mux',
      type: 'mux.video',
      name: 'mux',
      description: 'Mux video ID',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'mux',
    },
    {
      title: 'Static',
      type: 'string',
      name: 'static',
      description:
        'Path to a video on the web, or a static video uploaded in the next.js public folder, e.g /video/movie.mp4',
      hidden: ({ parent, value }) => !value && parent?.provider !== 'static',
    },
    {
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      fieldset: 'videoOptions',
      description: 'Replay the video when it ends.',
    },
    {
      name: 'autoPlay',
      title: 'Auto play',
      type: 'boolean',
      fieldset: 'videoOptions',
      description: 'Start playing the video automatically.',
    },
    {
      name: 'frameless',
      title: 'Frameless',
      type: 'boolean',
      fieldset: 'videoOptions',
      description:
        'Remove controls from video. This may not work very well with Youtube or Vimeo.',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'Optional caption to display with the video. Only shown on the website when layout allows for it.',
    },
  ],
};

export default schema;
