import { Meta } from '@storybook/react';
import React from 'react';

import { AnimateInView } from './AnimateInView';

export default {
  component: AnimateInView,
  title: 'Components/AnimateInView',
} as Meta;

const Box = ({ children }) => (
  <div className="w-64 h-64 bg-blue-500 text-white flex items-center justify-center rounded-md">
    {children}
  </div>
);

export const Default = () => (
  <div className="flex flex-col gap-4 overflow-hidden">
    <AnimateInView>
      <Box>default</Box>
    </AnimateInView>

    <AnimateInView>
      <Box>…</Box>
    </AnimateInView>

    <AnimateInView x={100}>
      <Box>x = 100</Box>
    </AnimateInView>

    <AnimateInView x={-100}>
      <Box>x = -100</Box>
    </AnimateInView>

    <AnimateInView>
      <Box>…</Box>
    </AnimateInView>

    <AnimateInView y={-100}>
      <Box>y = -100</Box>
    </AnimateInView>

    <AnimateInView y={100}>
      <Box>y = 100</Box>
    </AnimateInView>

    <AnimateInView>
      <Box>…</Box>
    </AnimateInView>

    <AnimateInView className="flex justify-end border">
      <Box>extra classes</Box>
    </AnimateInView>

    <AnimateInView delay={1}>
      <Box>delay</Box>
    </AnimateInView>

    <AnimateInView>
      <Box>…</Box>
    </AnimateInView>

    <AnimateInView once>
      <Box>once</Box>
    </AnimateInView>

    <AnimateInView threshold={1} className="relative w-64 overflow-hidden">
      <Box>threshold = 1</Box>
      <span className="absolute h-1 bottom-0 inset-x-0 bg-blue-800 block" />
    </AnimateInView>

    <AnimateInView threshold={0} className="relative w-64 overflow-hidden">
      <Box>threshold = 0</Box>
      <span className="absolute h-1 top-0 inset-x-0 bg-blue-800 block" />
    </AnimateInView>

    <AnimateInView threshold={0.5} className="relative w-64 overflow-hidden">
      <Box>threshold = .5</Box>
      <span className="absolute h-1 top-1/2 transform translate-y-1/2 inset-x-0 bg-blue-800 block" />
    </AnimateInView>
  </div>
);
