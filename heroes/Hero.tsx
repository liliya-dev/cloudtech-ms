import cx from 'classnames';
import React from 'react';

import { AnimateInView } from '../components/animation/AnimateInView';
import { ButtonProps } from '../components/buttons/Button';
import { ButtonGroup } from '../components/buttons/ButtonGroup';
import { Image } from '../components/images/Image';
import { Background, BackgroundProps } from '../components/module/Background';
import { ColorType } from '../components/module/BackgroundOptions';
import { Text } from '../components/module/Text';
import { Title } from '../components/module/Title';
import { ImageType } from '../types';

export type HeroProps = {
  title: string;
  intro: React.ReactElement;
  buttons?: ButtonProps[];
  image?: ImageType;
  video?: React.ReactElement;
  children?: React.ReactNode;
} & Partial<BackgroundProps>;

export const Hero = ({
  title,
  intro,
  buttons,
  image,
  video,
  background = 'white',
  children,
}: HeroProps) => {
  if (video) image = null;

  return (
    <div className="relative overflow-hidden">
      <Background background={background}>
        <div
          className={cx('max-w-xl mx-auto px-4 xl:px-4', {
            ['lg:flex lg:py-24']: image?.type === 'screenshot',
          })}
        >
          <div
            className={cx(
              'relative z-10 py-8 sm:py-16 md:py-20 lg:max-w-2xl',
              { ['lg:w-1/2 lg:py-48 xl:py-56']: image?.type === 'screenshot' },
              {
                ['lg:w-1/2 lg:py-28 xl:py-32']: video || image?.type === 'photo',
              },
            )}
          >
            <main className="mx-auto relative z-1">
              <div className="sm:text-center lg:text-left lg:pr-12">
                {title && (
                  <AnimateInView delay={0.05} className="block">
                    <Title size="xl">{title}</Title>
                  </AnimateInView>
                )}

                {intro && (
                  <AnimateInView
                    delay={0.1}
                    className={cx(
                      'mt-4 sm:mt-5 max-w-xl sm:mx-auto lg:mx-0 inline-block',
                    )}
                  >
                    <Text as="div" background={background} align="auto" size="xl">
                      {intro}
                    </Text>
                  </AnimateInView>
                )}

                {Boolean(buttons?.length) && (
                  <AnimateInView delay={0.15} className="mt-4 sm:mt-6">
                    <ButtonGroup items={buttons} />
                  </AnimateInView>
                )}

                {children && (
                  <AnimateInView delay={0.2} className="mt-4 sm:mt-6">
                    {children}
                  </AnimateInView>
                )}
              </div>
            </main>
          </div>

          {image?.type === 'screenshot' && (
            <div className="flex-1 relative h-auto text-center lg:text-left">
              <AnimateInView delay={0.25}>
                <div className="lg:absolute lg:left-4 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-right-full pb-12 lg:pb-0 shadow-hero-screenshot">
                  <Image {...image} preventResize={true} priority />
                </div>
              </AnimateInView>
            </div>
          )}
        </div>

        {(video || image?.type === 'photo') && (
          <AnimateInView
            delay={0.25}
            className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative w-full h-80 lg:h-auto"
          >
            {image && (
              <Image
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                layout="fill"
                priority
                {...image}
              />
            )}
            {video}
          </AnimateInView>
        )}
      </Background>
    </div>
  );
};

export const HeroMemo = React.memo(Hero);
