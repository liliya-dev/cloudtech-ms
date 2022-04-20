import { Meta } from '@storybook/react';
import React from 'react';

import { Button } from './Button';
import { ALIGN_OPTIONS, COLOR_OPTIONS, SIZE_OPTIONS } from './ButtonOptions';

export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

export const Colors = () => (
  <>
    {(
      Object.entries(COLOR_OPTIONS) as [
        key: keyof typeof COLOR_OPTIONS,
        label: string,
      ][]
    ).map(([color, label]) => (
      <div key={color} className="flex gap-2 mb-10">
        <Button label={color} theme={color} />
        <Button label="current" theme={color} current />
        <Button label="loading" theme={color} loading />
        <Button label="disabled" theme={color} disabled />
      </div>
    ))}
  </>
);

export const Sizes = () => (
  <div className="flex flex-col gap-2 flex-wrap">
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="mr-2 mb-2">
        <Button label={label} size={size} />
        <Button label={label} size={size} current />
        <Button label={label} size={size} loading />
        <Button label={label} size={size} disabled />
      </div>
    ))}
  </div>
);

export const Plain = () => (
  <>
    {(
      Object.entries(COLOR_OPTIONS) as [
        key: keyof typeof COLOR_OPTIONS,
        label: string,
      ][]
    ).map(([color, label]) => (
      <div key={color} className="flex gap-2 mb-10">
        <Button label={color} theme={color} plain icon="ArrowRightIcon" />
        <Button label="current" theme={color} plain icon="ArrowRightIcon" current />
        <Button label="" theme={color} plain icon="ArrowRightIcon" />
        <Button label="" theme={color} plain loading />
      </div>
    ))}
  </>
);

export const Compact = () => (
  <>
    {(
      Object.entries(COLOR_OPTIONS) as [
        key: keyof typeof COLOR_OPTIONS,
        label: string,
      ][]
    ).map(([color, label]) => (
      <div key={color} className="mb-10 flex flex-wrap">
        {(
          Object.entries(SIZE_OPTIONS) as [
            key: keyof typeof SIZE_OPTIONS,
            label: string,
          ][]
        ).map(([size, label]) => (
          <div key={label} className="mr-2 mb-2">
            <Button
              label={color}
              theme={color}
              size={size}
              compact
              icon="ArrowRightIcon"
            />
            <Button label={color} theme={color} size={size} compact loading />
          </div>
        ))}
      </div>
    ))}
  </>
);

export const PlainCompact = () => (
  <>
    {(
      Object.entries(COLOR_OPTIONS) as [
        key: keyof typeof COLOR_OPTIONS,
        label: string,
      ][]
    ).map(([color, label]) => (
      <div key={color} className="mb-10">
        <Button label={color} theme={color} plain compact icon="ArrowRightIcon" />
        <Button
          label={color}
          theme={color}
          plain
          compact
          icon="ArrowRightIcon"
          loading
        />
      </div>
    ))}
  </>
);

export const Stretch = () => <Button label="Button text" size="lg" stretch />;

export const Round = () => <Button label="Button text" size="lg" round />;

export const RoundWithIcon = () => (
  <Button label="Button text" size="lg" round icon="ArrowRightIcon" />
);

export const AsButton = () => (
  <Button label="Button text" as="button" onClick={() => alert('hello')} />
);

export const AsLink = () => (
  <Button label="Button text" as="a" href="https://www.google.com" />
);

export const AsDiv = () => (
  <Button label="Button text" as="div" icon="ArrowRightIcon" />
);

export const IconAfter = () => (
  <Button label="Read more" icon="ArrowRightIcon" iconPosition="after" />
);

export const IconBefore = () => (
  <Button label="Button text" icon="DemoIcon" iconPosition="before" />
);

export const Alignment = () => (
  <>
    {(
      Object.entries(ALIGN_OPTIONS) as [
        key: keyof typeof ALIGN_OPTIONS,
        label: string,
      ][]
    ).map(([align, label]) => (
      <div key={label} className="p-4">
        <Button
          stretch
          label="Button text"
          align={align}
          icon="DemoIcon"
          iconPosition="before"
        />
      </div>
    ))}
  </>
);

export const IconOnly = () => (
  <>
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="flex gap-2 mr-2 mb-2">
        <Button
          size={size}
          ariaLabel="Button text"
          icon="DemoIcon"
          iconPosition="before"
        />
        <Button
          size={size}
          ariaLabel="Button text"
          icon="DemoIcon"
          iconPosition="before"
          compact
        />
      </div>
    ))}
  </>
);

export const IconOnlyRound = () => (
  <>
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="mr-2 mb-2">
        <Button
          size={size}
          ariaLabel="Button text"
          icon="DemoIcon"
          iconPosition="before"
          round
        />
      </div>
    ))}
  </>
);

export const OrphanIcons = () => (
  <div style={{ maxWidth: 200 }} className="grid gap-4 border border-blue-500 p-0.5">
    <Button label="Email TeamMate - End User License Agreement" />

    <Button
      label="Agreement Email TeamMate - End User License Agreement"
      icon="DemoIcon"
      iconPosition="before"
    />
    <Button
      label="Agreement Email TeamMate - End User License Agreement"
      icon="DemoIcon"
      iconPosition="after"
    />
    <Button
      label="Agreement Email TeamMate - End User License Agreement"
      plain
      icon="DemoIcon"
      iconPosition="after"
    />
  </div>
);
