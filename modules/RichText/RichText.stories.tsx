import { Meta } from '@storybook/react';
import React from 'react';

import { ColorType, COLOR_OPTIONS } from '../../components/module/BackgroundOptions';
import { RichText } from './RichText';

export default {
  component: RichText,
  title: 'Modules/RichText',
} as Meta;

const demoContent = (
  <div>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <p>
      Knight Rider, a <strong>shadowy flight</strong> into the dangerous world{' '}
      <em>of a man who does not exist</em>. Michael Knight, a young loner on a
      crusade to <a href="">champion the cause</a> of the innocent, the helpless in a
      world of criminals who operate above the law.
    </p>
    <ul>
      <li>List item</li>
      <li>
        List item
        <ul>
          <li>List item</li>
          <li>List item</li>
          <li>
            <a href="">List item</a>
          </li>
        </ul>
      </li>
      <li>List item</li>
    </ul>
    <ol>
      <li>List item</li>
      <li>
        List item
        <ul>
          <li>List item</li>
          <li>
            <a href="">List item</a>
          </li>
          <li>List item</li>
        </ul>
      </li>
      <li>List item</li>
    </ol>
  </div>
);

export const Default = () => <RichText content={demoContent} />;

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS)
    .map((color: ColorType) => (
      <div key={color} className="mb-10">
        <RichText content={demoContent} background={color} />
      </div>
    ))}
  </>
);
