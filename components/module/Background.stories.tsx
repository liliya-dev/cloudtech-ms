import { Meta } from '@storybook/react';
import React from 'react';

import { Background as ModuleBackground } from './Background';
import { COLOR_OPTIONS, ColorType } from './BackgroundOptions';

export default {
  component: ModuleBackground,
  title: 'Components/Module/Background',
} as Meta;

export const Background = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <ModuleBackground background={color}>
          <div className="p-8">Module background {color}</div>
        </ModuleBackground>
      </div>
    ))}
  </>
);
