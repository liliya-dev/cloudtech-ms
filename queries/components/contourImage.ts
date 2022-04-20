import groq from 'groq';

import { imageSimpleQuery } from './image';

export const contourImageQuery = groq`
  "image": ${imageSimpleQuery},
  "contour": {
    "color": @.image.color,
    "position": @.image.position,
  }
`;
