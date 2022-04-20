import React from 'react';

import { VideoMemo as VideoComponent } from '../../components/video/Video';
import { HeroMemo as Hero } from '../../heroes/Hero';
import { HeroSchemaName } from '../../types.sanity';
import { PortableTextMemo as PortableText } from './PortableText';
import { StaticFormBuilderMemo as StaticFormBuilder } from './StaticFormBuilder';

export type HeroBuilderProps = {
  hero: HeroProps; // TODO: type all modules
};

// TODO: losing all typing here, there's no connection between queried modules and props for now
type HeroProps = any & {
  _type: HeroSchemaName;
  _key: string;
  [key: string]: any;
};

export const HeroBuilder = ({ hero }: HeroProps) => {
  if (!hero) return null;

  return (
    <>
      {/* hero visual */}
      {hero._type === 'hero.visual' && (
        <Hero
          {...hero}
          intro={<PortableText content={hero.intro} />}
          video={hero.video?.videoId && <VideoComponent {...hero.video} />}
        >
          {hero.form?.formId && (
            <StaticFormBuilder {...hero.form} className="w-96 inline-block" />
          )}
        </Hero>
      )}
    </>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
