import groq from 'groq';

import { ImageType } from '../types';
import { imageQuery } from './components/image';

export type SeoType = {
  title?: string;
  description?: string;
  image: ImageType;
};

export type TwitterType = {
  handle?: string;
  url?: string;
};

export type ConfigType = {
  name?: string;
  domain?: string;
  seo?: SeoType;
  twitter?: TwitterType;
  socials?: string[];
  gtmid?: string;
};

export const configQuery = groq`
*[_id == 'config'][0] {
  ...,
  seo {
    ...,
    "image": ${imageQuery}
  }
}
`;
