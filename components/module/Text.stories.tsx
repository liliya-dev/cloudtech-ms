import { Meta } from '@storybook/react';
import React from 'react';

import { Background } from './Background';
import { ColorType, COLOR_OPTIONS } from './BackgroundOptions';
import { ALIGN_OPTIONS, Text as TextComponent } from './Text';

export default {
  component: TextComponent,
  title: 'Components/Module/Text',
} as Meta;

export const Text = () => (
  <div className="divide-y">
    {(
      Object.entries(ALIGN_OPTIONS) as [
        key: keyof typeof ALIGN_OPTIONS,
        label: string,
      ][]
    ).map(([align, label]) => (
      <div key={label} className="p-4">
        <TextComponent align={align}>
          Unify all your conversations and documents - drag and drop Outlook emails
          and attachments into SharePoint, Teams or OneDrive. Add emails to
          conversations without leaving Teams.
        </TextComponent>
      </div>
    ))}

    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <Background background={color} key={color}>
        <TextComponent background={color}>
          <div className="p-4">Module background {color}</div>
        </TextComponent>
      </Background>
    ))}
  </div>
);
