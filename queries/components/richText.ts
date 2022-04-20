import groq from 'groq';

import { buttonHrefQuery, buttonQuery } from './button';
import { imageSourceQuery } from './image';
import { videoSourceQuery } from './video';

export const richTextImage = `
_type == "image.simple" => {
  ...,
  "image": ${imageSourceQuery},
}`;

export const richTextVideo = `
_type == "video" => {
  "video": ${videoSourceQuery}
}`;

export const richTextButtons = `
_type == "buttons" => {
  "direction": direction,
  "items": items[] ${buttonQuery}
}`;

export const richTextMarkDefs = `
markDefs[]{
  ...,
  _type == "link" => {
    "href": ${buttonHrefQuery}
  }
}`;

export const richTextAccordion = `
_type == "accordion" => {
  "items": items[] {
    title,
    content[] {
      ...,
      ${richTextImage},
      ${richTextVideo},
      ${richTextButtons},
      ${richTextMarkDefs}
    }
  }
}`;

export const richTextQueryFields = groq`
  ...,
  ${richTextImage},
  ${richTextVideo},
  ${richTextButtons},
  ${richTextAccordion},
  ${richTextMarkDefs}
 `;

export const richTextQuery = groq`
{
  ${richTextQueryFields}
}
`;
