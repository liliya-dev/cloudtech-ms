import cx from 'classnames';
import React from 'react';

import { BackgroundProps } from '../../components/module/Background';
import { Wrapper } from '../../components/module/Wrapper';

export type RichTextProps = {
  content: React.ReactElement;
} & Partial<BackgroundProps>;

const colorClasses: Record<BackgroundProps['background'], string> = {
  white: 'prose-slate',
  black: 'prose-invert',
};

export const RichText = ({ content, background }: RichTextProps) => {
  return (
    <Wrapper background={background}>
      <div
        className={cx(
          'mx-auto prose prose-md md:prose-lg break-words',
          colorClasses[background],
        )}
      >
        {content}
      </div>
    </Wrapper>
  );
};

export const RichTextMemo = React.memo(RichText);
