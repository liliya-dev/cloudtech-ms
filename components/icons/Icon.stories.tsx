import { Meta } from '@storybook/react';
import React from 'react';

import { Icon } from './Icon';

export default {
  component: Icon,
  title: 'Components/Icon',
} as Meta;

export const ExternalLinkIcon = () => (
  <>
    {['h-4 w-4', 'h-6 w-6', 'h-8 w-8', 'h-10 w-10'].map((sizeClass) => (
      <Icon
        name="ExternalLinkIcon"
        className={`${sizeClass} text-grey-900`}
        key={sizeClass}
      />
    ))}
  </>
);
