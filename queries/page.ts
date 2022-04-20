import groq from 'groq';

import { ImageType } from '../types';
import { ModuleSchemaName, SchemaName } from '../types.sanity';
import { buttonQuery } from './components/button';
import { contourImageQuery } from './components/contourImage';
import { imageSimpleQuery, imageQuery } from './components/image';
import { richTextQuery } from './components/richText';
import { staticFormQuery } from './components/staticForm';
import { videoQuery } from './components/video';
import { ConfigType } from './config';

export type PageType = {
  _type: SchemaName;
  _id: string;
  hero: {};
  image?: ImageType;
  description?: string;
  title: string;
  hideNav?: boolean;
  hideFooter?: boolean;
  seo: ConfigType['seo'];
  modules: { _type: ModuleSchemaName; image?: ImageType }[]; // TODO: type all modules
  dialogs: {}[]; // TODO: type all dialogs
};

export const pageQuery = groq`*[_id == $_id && _type == $_type][0]{
  _id,
  _type,
  title,
  hideNav,
  hideFooter,

  // article intro and image
  publishedAt,
  description,
  "image": ${imageQuery},

  // page seo
  seo {
    ...,
    "image": ${imageQuery}
  },

  // hero
  hero[] {
    _type,
    _key,

    // hero
    _type == "hero.visual" => {
      title,
      intro[] ${richTextQuery},
      background,
      "image": ${imageSimpleQuery},
      buttons[] ${buttonQuery},
      ${videoQuery},
      ${staticFormQuery}
    },
  }[0],

  // modules
  modules[] {
    _key,
    _type,

    // Accordion
    _type == "module.accordion" => {
      background,
      title,
      items[] {
        title,
        content[] ${richTextQuery}
      }
    },
  
    // video
    _type == "module.video" => {
      background,
      title,
      intro[] ${richTextQuery},
      buttons[] ${buttonQuery},
      ${videoQuery}
    },
  
    // textimage
    _type == "module.textimage" => {
      title,
      intro[] ${richTextQuery},
      background,
      align,
      ${contourImageQuery},
      ${videoQuery},
      buttons[] ${buttonQuery},
    },

    // rich text
    _type == "module.richtext" => {
      background,
      content[] ${richTextQuery}
    },   

     // Divider
     _type == "module.divider" => {
       background,
       size
     },
   
  },

  // dialogs
  dialogs[] {
    _key,
    _type,
      "slug": slug.current,
    _type == "dialog.richtext" => {
      content[] ${richTextQuery}
    },
    _type == "dialog.video" => {
      ${videoQuery}
    },
    _type == "dialog.form" => {
      ${staticFormQuery}    
    },
  },
}`;
