import { Meta } from '@storybook/react';
import React from 'react';

import { Button, ButtonProps } from '../components/buttons/Button';
import { ColorType, COLOR_OPTIONS } from '../components/module/BackgroundOptions';
import { Video } from '../components/video/Video';
import { NewsLetterSignUpForm } from '../forms/NewsLetterSignUpForm';
import { ImageType } from '../types';
import { Hero } from './Hero';

export default {
  component: Hero,
  title: 'Hero/Visual',
} as Meta;

const image: ImageType = {
  type: 'photo',
  src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  width: 1470,
  height: 980,
  alt: 'photo',
};

const title =
  'Bring Everything Together in SharePoint, Microsoft Teams, and OneDrive';

const intro = (
  <p>
    Unify all your conversations and documents - drag and drop Outlook emails and
    attachments into SharePoint, Teams or OneDrive. Add emails to conversations
    without leaving Teams.
  </p>
);

const buttons: ButtonProps[] = [
  { label: 'Start Free Trial', href: '' },
  { label: 'Watch demo', href: '', icon: 'ExternalLinkIcon' },
];

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <Hero
          title={title}
          intro={intro}
          buttons={buttons}
          image={image}
          background={color}
        />
      </div>
    ))}
  </>
);

export const NoButtons = () => <Hero title={title} intro={intro} image={image} />;

export const WithExtraContent = () => (
  <Hero
    title="Blog headline"
    intro={<p>Subscribe to our newsletter</p>}
    image={image}
  >
    <NewsLetterSignUpForm />
  </Hero>
);

export const WithVideo = () => (
  <Hero
    title="Video"
    intro={<p>Subscribe to our newsletter</p>}
    image={image}
    video={
      <Video
        provider="cloudinary"
        videoId="samples/sea-turtle"
        autoPlay
        frameless
        loop={false}
      />
    }
  />
);
