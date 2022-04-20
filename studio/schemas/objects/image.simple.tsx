import { ImageType, IMAGE_TYPE_OPTIONS } from '../../../types';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { optionsToList } from '../../utils/fields/optionsToList';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    type: ImageType['type'];
  };
  fields: ({
    name: 'source' | keyof ImageType;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'image.simple',
  title: 'Image',
  type: 'object',
  initialValue: {
    type: 'photo',
  },
  preview: {
    select: {
      alt: 'alt',
      caption: 'caption',
      type: 'type',
      media: 'source',
    },
    prepare({ alt = '', caption = '', type = '', media }) {
      return {
        title: `${alt} ${caption}`,
        subtitle: type,
        media,
      };
    },
  },
  fieldsets: [
    {
      name: 'imageOptions',
      title: 'Image options',
      options: { collapsed: true, collapsable: true },
    },
  ],
  fields: [
    {
      name: 'source',
      title: 'Source',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description:
        'The alternative text is used to describe the image for screen readers.',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'Optional caption to display with the image. Only shown on the website when layout allows for it.',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      fieldset: 'imageOptions',
      description:
        'Setting the type to `screenshot` will add a shadow to the image.',
      options: {
        list: optionsToList(IMAGE_TYPE_OPTIONS),
      },
    },
  ],
};

export default schema;
