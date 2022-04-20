import { Meta } from '@storybook/react';
import React from 'react';

import { ButtonProps } from '../../components/buttons/Button';
import { Video } from '../../components/video/Video';
import { ImageType } from '../../types';
import { TextImage } from './TextImage';
import { ColorType, COLOR_OPTIONS } from './TextImageOptions';

export default {
  component: TextImage,
  title: 'Modules/TextImage',
} as Meta;

const buttons: ButtonProps[] = [
  { label: 'Start Free Trial', href: '' },
  { label: 'Watch demo', href: '', icon: 'PlayIcon', theme: 'black' },
];

const image: ImageType = {
  type: 'photo',
  src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  width: 1470,
  height: 980,
  alt: 'photo',
  caption: 'Caption',
};

const screenshot: ImageType = {
  src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  width: 920,
  height: 539,
  type: 'screenshot',
  alt: 'screenshot',
};

const pngImage: ImageType = {
  type: 'photo',
  src: '/images/demo/photo-slanted.png',
  width: 514,
  height: 514,
  alt: 'screenshot',
};

const DemoParagraph = (
  <p>
    Ulysses, Ulysses — Soaring through all the galaxies. In search of Earth, flying
    in to the night. Ulysses, Ulysses — Fighting evil and tyranny, with all his
    power, and with all of his might. Ulysses — no-one else can do the things you do.
    Ulysses — like a bolt of thunder from the blue. Ulysses — always fighting all the
    evil forces bringing peace and justice to all.
  </p>
);

const DemoParagraphs = (
  <>
    <p>
      Knight Rider, a shadowy flight into the dangerous world of a man who does not
      exist. Michael Knight, a young loner on a crusade to champion the cause of the
      innocent, the helpless in a world of criminals who operate above the law.
    </p>

    <p>
      Ulysses, Ulysses — Soaring through all the galaxies. In search of Earth, flying
      in to the night. Ulysses, Ulysses — Fighting evil and tyranny, with all his
      power, and with all of his might. Ulysses — no-one else can do the things you
      do. Ulysses — like a bolt of thunder from the blue. Ulysses — always fighting
      all the evil forces bringing peace and justice to all.
    </p>
  </>
);

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <TextImage
          title="Document management"
          image={image}
          background={color}
          content={DemoParagraphs}
        />
      </div>
    ))}
  </>
);

export const Screenshot = () => (
  <TextImage
    title="Document management"
    image={screenshot}
    background="white"
    content={DemoParagraphs}
  />
);

export const WithCloudinaryVideo = () => (
  <TextImage
    title="Document management"
    background="white"
    content={DemoParagraphs}
    video={
      <Video
        provider="cloudinary"
        videoId="samples/sea-turtle"
        frameless
        autoPlay
        loop
      />
    }
  />
);

export const WithStaticVideo = () => (
  <TextImage
    title="Document management"
    background="white"
    content={DemoParagraphs}
    video={
      <Video
        provider="static"
        src="/video/mawla-video-hero_v3.mp4"
        frameless
        autoPlay
        loop
      />
    }
  />
);

export const WithYoutube = () => (
  <TextImage
    title="Document management"
    background="white"
    content={DemoParagraphs}
    video={<Video provider="youtube" videoId="bTqVqk7FSmY" />}
  />
);

export const WithVimeo = () => (
  <TextImage
    title="Document management"
    background="white"
    content={DemoParagraphs}
    video={<Video provider="vimeo" videoId="76979871" />}
  />
);

export const PNG = () => (
  <TextImage
    title="Document management"
    image={pngImage}
    background="white"
    align="left"
    content={DemoParagraph}
  />
);

export const WithButtons = () => (
  <TextImage
    title="Find & Discover"
    image={image}
    background="white"
    buttons={buttons}
    content={DemoParagraph}
  />
);

export const ImageShapeColor = () => (
  <TextImage
    title="Find & Discover"
    image={image}
    background="white"
    content={DemoParagraph}
  />
);

export const ImageFirst = () => (
  <TextImage
    title="Find & Discover"
    image={image}
    background="white"
    align="left"
    content={DemoParagraph}
  />
);

export const ImageLast = () => (
  <TextImage
    title="Find & Discover"
    image={image}
    background="white"
    content={DemoParagraph}
  />
);

export const SmallImage = () => (
  <TextImage
    title="Find & Discover"
    image={{ ...image, width: image.width / 8, height: image.height / 8 }}
    background="white"
    align="left"
    content={DemoParagraph}
  />
);

export const SmallImageLast = () => (
  <TextImage
    title="Find & Discover"
    image={{ ...image, width: image.width / 8, height: image.height / 8 }}
    background="white"
    content={DemoParagraph}
  />
);
