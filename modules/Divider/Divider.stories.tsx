import { Meta } from '@storybook/react';
import React from 'react';

import { Background } from '../../components/module/Background';
import { Divider } from './Divider';
import { ColorType, COLOR_OPTIONS, SIZE_OPTIONS } from './DividerOptions';

export default {
  component: Divider,
  title: 'Modules/Divider',
} as Meta;

export const Default = () => <Divider />;

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <Background background={color} key={color}>
        <div key={color} className="mb-10 py-4">
          <div>
            {(
              Object.entries(SIZE_OPTIONS) as [
                key: keyof typeof SIZE_OPTIONS,
                label: string,
              ][]
            ).map(([size, label]) => (
              <div key={size} className="my-4">
                <Divider background={color} size={size} />
              </div>
            ))}
          </div>
        </div>
      </Background>
    ))}
  </>
);
