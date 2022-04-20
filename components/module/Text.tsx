import cx from 'classnames';
import React from 'react';

import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS, COLORS, SIZES, TextElement } from '../../types';
import { BackgroundProps } from './Background';
import { ColorType as BackgroundColorType } from './BackgroundOptions';

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right', 'auto');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const SIZE_OPTIONS = pick(SIZES, 'sm', 'md', 'lg', 'xl');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const COLOR_OPTIONS = pick(COLORS, 'black', 'white');
export type ColorType = keyof typeof COLOR_OPTIONS;

export type TextProps = {
  children: React.ReactElement | React.ReactNode;
  as?: TextElement;
  align?: AlignType;
  size?: SizeType;
  color?: ColorType;
  className?: string;
} & Partial<BackgroundProps>;

const contrastColorClasses: Record<BackgroundColorType, string> = {
  white: 'prose-black ',
  black: 'prose-invert',
};

const textColorClasses: Record<ColorType, string> = {
  white: 'prose-invert ',
  black: 'prose-black',
};

const alignClasses: Record<AlignType, string> = {
  auto: '',
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};
const sizeClasses: Record<SizeType, string> = {
  sm: 'prose-sm',
  md: 'prose-md',
  lg: 'prose-lg',
  xl: 'prose-xl',
};

export const Text = ({
  children,
  as = 'p',
  background = 'white',
  color,
  align = 'left',
  size = 'lg',
  className,
}: TextProps) => {
  const Element = as;

  return (
    <div className={className}>
      <Element
        className={cx(
          'break-words prose prose-a:hover:underline font-normal leading-snug',
          alignClasses[align],
          sizeClasses[size],
          color ? textColorClasses[color] : contrastColorClasses[background],
        )}
      >
        {children}
      </Element>
    </div>
  );
};

export const TextMemo = React.memo(Text);
