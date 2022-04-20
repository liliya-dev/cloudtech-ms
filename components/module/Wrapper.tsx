import React from 'react';

import { slugify } from '../../helpers/utils/string';
import { Background, BackgroundProps } from './Background';
import { Spacing, SpacingProps } from './Spacing';
import { Width } from './Width';

export type WrapperProps = {
  id?: string;
  children: React.ReactElement | React.ReactNode;
} & Partial<BackgroundProps> &
  Partial<SpacingProps>;

export const Wrapper = ({
  children,
  background = 'white',
  space = 'md',
  id,
}: WrapperProps) => {
  return (
    <div id={id ? slugify(id) : null}>
      <Background background={background}>
        <Width>
          <Spacing space={space}>{children}</Spacing>
        </Width>
      </Background>
    </div>
  );
};

export const WrapperMemo = React.memo(Wrapper);
