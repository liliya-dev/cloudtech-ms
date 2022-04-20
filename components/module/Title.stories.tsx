import { Meta } from '@storybook/react';
import React from 'react';

import { SIZE_OPTIONS, Title, WEIGHT_OPTIONS } from './Title';

export default {
  component: Title,
  title: 'Components/Module/Title',
} as Meta;

export const TitleExample = () => (
  <>
    <div className="mb-10">
      <Title>Products</Title>
    </div>
    <div className="mb-10">
      <Title>Upcoming webinar announcement</Title>
    </div>
    <div className="mb-10">
      <Title>Ready to dive in? Start your free trial.</Title>
    </div>
  </>
);

export const TitleAsSpan = () => (
  <Title as="span">Ready to dive in? Start your free trial.</Title>
);

export const Sizes = () => (
  <div>
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="mb-10">
        <Title size={size}>Ready to dive in? Start your free trial.</Title>
      </div>
    ))}
  </div>
);

export const Weights = () => (
  <div>
    {(
      Object.entries(WEIGHT_OPTIONS) as [
        key: keyof typeof WEIGHT_OPTIONS,
        label: string,
      ][]
    ).map(([weight, label]) => (
      <div key={label} className="mb-10">
        <Title size="xl" weight={weight}>
          {weight}
        </Title>
      </div>
    ))}
  </div>
);
