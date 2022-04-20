import groq from 'groq';

export const imageQueryFields = groq`
  "src": url,
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
`;

export const imageSimpleQuery = groq`
  @.image.source.asset -> {
    "type": ^.image.type,
    "alt": ^.image.alt,
    "caption": ^.image.source.caption,
    "hotspot": ^.image.source.hotspot,
    "crop": ^.image.source.crop,
    ${imageQueryFields}
  }
`;

export const imageSourceQuery = groq`
  @.source.asset -> {
    "type": image.type,
    "alt": image.alt,
    "caption": image.caption,
    "hotspot": image.hotspot,
    "crop": image.crop,
    ${imageQueryFields}
  }
`;
export const imageQuery = groq`
  @.image.asset -> {
    ${imageQueryFields}
    "hotspot": ^.image.hotspot,
    "crop": ^.image.crop,
  }
`;
