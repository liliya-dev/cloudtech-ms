import { Meta } from '@storybook/react';
import React from 'react';

import { SIZE_OPTIONS, Spacing as SpacingComponent } from './Spacing';

export default {
  component: SpacingComponent,
  title: 'Components/Module/Spacing',
} as Meta;

export const Sizes = () => (
  <div>
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 p-4">
        <SpacingComponent space={size}>Module space {label}</SpacingComponent>
      </div>
    ))}
  </div>
);
