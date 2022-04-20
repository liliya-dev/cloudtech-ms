import { Meta } from '@storybook/react';
import React from 'react';

import { MyModule } from './MyModule';
import { ColorType, COLOR_OPTIONS } from './MyModuleOptions';

export default {
  component: MyModule,
  title: 'Modules/MyModule',
} as Meta;

export const Default = () => <MyModule title="MyModule" />;

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <MyModule title="MyModule" background={color} />
      </div>
    ))}
  </>
);
