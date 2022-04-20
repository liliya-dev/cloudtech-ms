import { Meta } from '@storybook/react';
import React from 'react';

import { ButtonProps } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { DIRECTION_OPTIONS } from './ButtonGroupOptions';

export default {
  component: ButtonGroup,
  title: 'Components/ButtonGroup',
} as Meta;

const buttons: ButtonProps[] = [
  { label: 'Button text', icon: 'DemoIcon' },
  { label: 'Button text', theme: 'white' },
];

export const Directions = () => (
  <div className="divide-y">
    {(
      Object.entries(DIRECTION_OPTIONS) as [
        key: keyof typeof DIRECTION_OPTIONS,
        label: string,
      ][]
    ).map(([direction, label]) => (
      <div key={label} className="py-10">
        <ButtonGroup items={buttons} direction={direction} />
      </div>
    ))}
  </div>
);

export const Stretch = () => (
  <div style={{ width: 300 }} className="border">
    {(
      Object.entries(DIRECTION_OPTIONS) as [
        key: keyof typeof DIRECTION_OPTIONS,
        label: string,
      ][]
    ).map(([direction, label]) => (
      <div key={label} className="py-10">
        <ButtonGroup
          direction={direction}
          items={buttons.map((button) => ({
            ...button,
            stretch: direction === 'vertical',
          }))}
          stretch
        />
      </div>
    ))}
  </div>
);
