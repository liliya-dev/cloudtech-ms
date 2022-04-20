import cx from 'classnames';
import React from 'react';

import { Background } from '../../components/module/Background';
import { ColorType, SizeType } from './DividerOptions';

export type DividerProps = {
  size?: SizeType;
  background?: ColorType;
};

const colorClasses: Record<ColorType, string> = {
  white: 'border-color-gray-100',
  black: 'border-color-white border-opacity-20',
};

export const Divider = ({ background, size = 'xl' }: DividerProps) => {
  return (
    <Background background={background}>
      <div
        className={cx('border-t', colorClasses[background], {
          ['w-full']: size === 'xl',
          ['mx-auto px-4']: size !== 'xl',
          ['w 1/4 md:w-10']: size === 'xs',
          ['w 1/3 md:w-64']: size === 'sm',
          ['w-1/2 md:w-full md: max-w-text']: size === 'md',
          ['w-full max-w-xl']: size === 'lg',
        })}
      />
    </Background>
  );
};

export const DividerMemo = React.memo(Divider);
