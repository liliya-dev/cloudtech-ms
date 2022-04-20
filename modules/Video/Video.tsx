import cx from 'classnames';
import React from 'react';

import { AnimateInView } from '../../components/animation/AnimateInView';
import { ButtonProps } from '../../components/buttons/Button';
import { FigCaption } from '../../components/images/FigCaption';
import { BackgroundProps } from '../../components/module/Background';
import { Content, ContentProps } from '../../components/module/Content';
import { Title } from '../../components/module/Title';
import { Wrapper } from '../../components/module/Wrapper';
import { VideoMemo as VideoComponent } from '../../components/video/Video';
import { VideoType } from '../../types';

export type VideoProps = {
  title?: string;
  intro?: ContentProps['children'];
  buttons?: ButtonProps[];
  video?: VideoType;
} & Partial<BackgroundProps>;

export const Video = ({ title, intro, buttons, background, video }: VideoProps) => {
  return (
    <div className="bg-white px-10">
      <div className="rounded-xl overflow-hidden">
        <Wrapper background={background}>
          <div className="text-center">
            {title && (
              <AnimateInView y={30}>
                <Title as="h2" size="xl" weight="extrabold">
                  {title}
                </Title>
              </AnimateInView>
            )}

            {(buttons || intro) && (
              <AnimateInView className="mt-4 sm:mt-6 mx-auto" y={30}>
                <Content buttons={buttons} background={background} align="center">
                  {intro}
                </Content>
              </AnimateInView>
            )}

            {video && (
              <AnimateInView className="mt-4 sm:mt-6 mx-auto">
                <figure>
                  <div
                    className={cx('overflow-hidden rounded-md', {
                      'relative aspect-video': video.frameless,
                    })}
                  >
                    <VideoComponent {...video} />
                  </div>

                  {video?.caption && (
                    <div className="mt-3">
                      <FigCaption background={background} caption={video.caption} />
                    </div>
                  )}
                </figure>
              </AnimateInView>
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export const VideoMemo = React.memo(Video);
