import { Meta } from '@storybook/react';
import React from 'react';

import { ColorType, COLOR_OPTIONS } from '../../components/module/BackgroundOptions';
import { Video } from './Video';

export default {
  component: Video,
  title: 'Modules/Video',
} as Meta;

export const Default = () => (
  <Video
    title="Video"
    intro={<p>this is an intro</p>}
    buttons={[{ label: 'Read more', href: '/' }]}
    video={{
      provider: 'static',
      videoId: '/video/mawla-video-hero_v3.mp4',
    }}
  />
);

export const AutoPlay = () => (
  <Video
    video={{
      provider: 'static',
      videoId: '/video/mawla-video-hero_v3.mp4',
      autoPlay: true,
    }}
  />
);

export const Loop = () => (
  <Video
    video={{
      provider: 'static',
      videoId: '/video/mawla-video-hero_v3.mp4',
      loop: true,
    }}
  />
);

export const Youtube = () => (
  <Video video={{ provider: 'youtube', videoId: 'bTqVqk7FSmY' }} />
);

export const Caption = () => (
  <Video
    video={{
      provider: 'youtube',
      videoId: 'bTqVqk7FSmY',
      caption: 'This is a video',
    }}
  />
);

export const Vimeo = () => (
  <Video video={{ provider: 'vimeo', videoId: '76979871' }} />
);

export const Cloudinary = () => (
  <Video video={{ provider: 'cloudinary', videoId: 'samples/sea-turtle' }} />
);

export const Mux = () => (
  <Video
    video={{
      provider: 'mux',
      videoId: 'SDkcSsvEj1QRgDRRGqZ2a63keqyKyMFTP5AG9xUUyIk',
    }}
  />
);

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <Video
          background={color}
          video={{
            provider: 'youtube',
            videoId: 'bTqVqk7FSmY',
            caption: 'This is a video',
          }}
        />
      </div>
    ))}
  </>
);
