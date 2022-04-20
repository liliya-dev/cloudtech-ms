import { Meta } from '@storybook/react';
import React from 'react';

import { Width as WidthComponent } from './Width';

export default {
  component: WidthComponent,
  title: 'Components/Module/Width',
} as Meta;

export const Width = () => (
  <div className="bg-blue-100">
    <WidthComponent>
      <div className="bg-blue-500 p-10" />
    </WidthComponent>
  </div>
);
