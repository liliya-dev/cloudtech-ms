import { Meta } from '@storybook/react';
import React from 'react';

import { ColorType, COLOR_OPTIONS } from './BackgroundOptions';
import { SIZE_OPTIONS } from './Spacing';
import { Wrapper as WrapperComponent } from './Wrapper';

export default {
  component: WrapperComponent,
  title: 'Components/Module/Wrapper',
} as Meta;

export const Wrapper = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <>
        {(
          Object.entries(SIZE_OPTIONS) as [
            key: keyof typeof SIZE_OPTIONS,
            label: string,
          ][]
        ).map(([size, label]) => (
          <div key={`${color}-${size}`} className="mb-10">
            <WrapperComponent background={color} space={size}>
              {color} / {label}
            </WrapperComponent>
          </div>
        ))}
      </>
    ))}
  </>
);
