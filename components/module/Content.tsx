import cx from 'classnames';
import React from 'react';

import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS } from '../../types';
import { AnimateInView } from '../animation/AnimateInView';
import { ButtonProps } from '../buttons/Button';
import { ButtonGroup } from '../buttons/ButtonGroup';
import { BackgroundProps } from './Background';
import { Text } from './Text';
import { Title } from './Title';

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export type ContentProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  buttons?: ButtonProps[];
  align?: AlignType;
} & Partial<BackgroundProps>;

const alignClasses: Record<AlignType, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right',
};

export const Content = ({
  title,
  buttons,
  background,
  align = 'left',
  children,
}: ContentProps) => {
  return (
    <div className={cx(alignClasses[align])}>
      {title && (
        <AnimateInView y={5} delay={0.1}>
          <div className="mb-4 sm:mb-5">
            <Title as="h2">{title}</Title>
          </div>
        </AnimateInView>
      )}

      {children && (
        <AnimateInView y={5} delay={0.15}>
          <div className="mb-6 sm:mb-8">
            <Text background={background} align={align} as="div">
              {children}
            </Text>
          </div>
        </AnimateInView>
      )}

      {Boolean(buttons?.length) && (
        <AnimateInView y={5} delay={0.2}>
          <ButtonGroup items={buttons} />
        </AnimateInView>
      )}
    </div>
  );
};

export const ContentMemo = React.memo(Content);
