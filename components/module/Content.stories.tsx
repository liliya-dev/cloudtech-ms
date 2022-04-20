import { Meta } from '@storybook/react';
import React from 'react';

import { ALIGN_OPTIONS, Content as ContentComponent } from './Content';

export default {
  component: ContentComponent,
  title: 'Components/Module/Content',
} as Meta;

export const Example = () => (
  <ContentComponent title="Title" buttons={[{ label: 'button' }]}>
    <p>intro text</p>
  </ContentComponent>
);

export const Title = () => <ContentComponent title="Title" />;

export const Intro = () => (
  <ContentComponent>
    <p>intro text</p>
  </ContentComponent>
);

export const Buttons = () => <ContentComponent buttons={[{ label: 'button' }]} />;

export const Align = () => (
  <div className="divide-y-1">
    {(
      Object.entries(ALIGN_OPTIONS) as [
        key: keyof typeof ALIGN_OPTIONS,
        label: string,
      ][]
    ).map(([align, label]) => (
      <div key={label} className="p-4">
        <ContentComponent
          title="Title"
          buttons={[{ label: 'button' }]}
          align={align}
        >
          <p>intro text</p>
        </ContentComponent>
      </div>
    ))}
  </div>
);
