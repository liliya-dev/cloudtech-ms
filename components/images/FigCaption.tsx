import cx from 'classnames';
import { node } from 'prop-types';
import React from 'react';

import { ColorType } from '../module/BackgroundOptions';

type FigCaptionProps = {
  background?: ColorType;
  caption: string;
};

const textColorClasses: Record<ColorType, string> = {
  white: 'text-gray-500',
  black: 'text-white',
};

export const FigCaption = ({ background, caption }: FigCaptionProps) => {
  if (!caption?.trim().length) return null;
  return (
    <figcaption
      className={cx('text-xs leading-relaxed', textColorClasses[background])}
    >
      {caption}
    </figcaption>
  );
};

export const FigCaptionMemo = React.memo(FigCaption);
