import React from 'react';

import { FigCaptionMemo as FigCaption } from '../../components/images/FigCaption';
import { VideoMemo as VideoComponent } from '../../components/video/Video';
import { AccordionMemo as Accordion } from '../../modules/Accordion/Accordion';
import { DividerMemo as Divider } from '../../modules/Divider/Divider';
import { RichTextMemo as RichText } from '../../modules/RichText/RichText';
import { TextImageMemo as TextImage } from '../../modules/TextImage/TextImage';
import { VideoMemo as VideoModule } from '../../modules/Video/Video';
import { ModuleSchemaName } from '../../types.sanity';
import { PortableTextMemo as PortableText } from './PortableText';

export type ModuleBuilderProps = {
  items: any[]; // TODO: type all modules
};

// TODO: losing all typing here, there's no connection between queried modules and props for now
type ModuleProps = any & {
  _type: ModuleSchemaName;
  _key: string;
  [key: string]: any;
};

export const ModuleBuilder = ({ items }: ModuleBuilderProps) => {
  return (
    <>
      {items?.map((item: ModuleProps) => (
        <React.Fragment key={item._key}>
          {/* text image */}
          {item._type === 'module.textimage' && (
            <TextImage
              {...item}
              content={<PortableText content={item.intro} />}
              video={
                item.video?.videoId && (
                  <figure>
                    {item.video && (
                      <div className="mb-3 aspect-video relative">
                        <VideoComponent {...item.video} />
                      </div>
                    )}
                    {item.video.caption && (
                      <FigCaption
                        background={item.background}
                        caption={item.video.caption}
                      />
                    )}
                  </figure>
                )
              }
            />
          )}

          {/* rich text */}
          {item._type === 'module.richtext' && (
            <RichText
              background={item.background}
              content={<PortableText content={item.content} />}
            />
          )}

          {/* video */}
          {item._type === 'module.video' && (
            <VideoModule {...item} intro={<PortableText content={item.intro} />} />
          )}

          {/* Accordion */}
          {item._type === 'module.accordion' && (
            <Accordion
              {...item}
              items={item.items?.map((accordionItem) => ({
                ...accordionItem,
                content: <PortableText content={accordionItem.content} />,
              }))}
            />
          )}

          {/* Divider */}
          {item._type === 'module.divider' && <Divider {...item} />}
        </React.Fragment>
      ))}
    </>
  );
};

export const ModuleBuilderMemo = React.memo(ModuleBuilder);
