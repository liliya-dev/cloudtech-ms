import cx from 'classnames';
import React from 'react';

import { AnimateInView } from '../../components/animation/AnimateInView';
import { ButtonProps } from '../../components/buttons/Button';
import { FigCaption } from '../../components/images/FigCaption';
import { Image } from '../../components/images/Image';
import { Content } from '../../components/module/Content';
import { Wrapper } from '../../components/module/Wrapper';
import { ImageType } from '../../types';
import { AlignType, ColorType } from './TextImageOptions';

export type TextImageProps = {
  image?: ImageType;
  align?: AlignType;
  content?: React.ReactElement;
  video?: React.ReactElement;
  background?: ColorType;
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  buttons?: ButtonProps[];
};

export const TextImage = ({
  title,
  buttons,
  image,
  background,
  align = 'right',
  content,
  children,
  video,
}: TextImageProps) => {
  if (video) image = null;

  return (
    <Wrapper background={background} id={title} space="sm">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center md:items-start lg:items-center gap-10 md:gap-18 lg:gap-24">
        {content && (
          <div className="order-2">
            <Content title={title} buttons={buttons} background={background}>
              {content}
            </Content>
          </div>
        )}

        {(image || video) && (
          <AnimateInView
            y={30}
            className={cx(
              align === 'left' ? 'order-1 md:order-1' : 'order-1 md:order-3',
            )}
          >
            <figure>
              {video ? (
                <div className="aspect-video relative">{video}</div>
              ) : (
                <>
                  <div className={cx('relative flex md:justify-center mb-3')}>
                    <Image {...image} />
                  </div>
                  {image.caption && (
                    <FigCaption background={background} caption={image.caption} />
                  )}
                </>
              )}
            </figure>
          </AnimateInView>
        )}
      </div>

      {children && <div className="mt-6 md:mt-8 lg:mt-10">{children}</div>}
    </Wrapper>
  );
};

export const TextImageMemo = React.memo(TextImage);
