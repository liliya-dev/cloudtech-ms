import { Meta } from '@storybook/react';
import React from 'react';

import { AccordionItemType } from '../../components/Accordion/Accordion';
import { ColorType, COLOR_OPTIONS } from '../../components/module/BackgroundOptions';
import { Accordion } from './Accordion';

export default {
  component: Accordion,
  title: 'Modules/Accordion',
} as Meta;

const items: AccordionItemType[] = [
  { title: 'Item 1', content: '…' },
  { title: 'Item 2', content: '…' },
  { title: 'Item 3', content: '…' },
];

export const Default = () => <Accordion title="Accordion" items={items} />;

export const Colors = () => (
  <>
    {Object.keys(COLOR_OPTIONS).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <Accordion title="Accordion" background={color} items={items} />
      </div>
    ))}
  </>
);
