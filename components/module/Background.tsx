import cx from 'classnames';
import React from 'react';

import { ColorType } from './BackgroundOptions';

export type BackgroundProps = {
  children: React.ReactElement | React.ReactNode;
  background: ColorType;
};

const backgroundClasses: Record<ColorType, string> = {
  white: 'bg-white text-dark',
  black: 'bg-black text-white',
};

export const Background = ({ children, background = 'white' }: BackgroundProps) => {
  return (
    <div
      className={cx(
        'relative overflow-y-hidden',
        backgroundClasses[background || 'white'],
      )}
    >
      <div className="relative z-1 overflow-x-hidden">{children}</div>
    </div>
  );
};

export const BackgroundMemo = React.memo(Background);
