import { nanoid } from 'nanoid';

import {
  DialogSchemaName,
  DIALOG_SCHEMAS,
  HeroSchemaName,
  HERO_SCHEMAS,
  ModuleSchemaName,
  MODULE_SCHEMAS,
} from '../../../types.sanity';
import { getISODateString } from '../../utils/datetime';
import { isSlugUnique } from '../../utils/desk/isSlugUnique';
import { validate } from '../../utils/validate';
import { SEO_FIELD } from './config';

export const TITLE_FIELD = {
  name: 'title',
  title: 'Title',
  type: 'string',
  validation: validate({ required: true }),
};

export const SLUG_FIELD = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  description:
    'The unique identifying part of a web address at the end of the URL. Only lowercase and no special characters except -.',
  options: {
    source: 'title',
    maxLength: 96,
  },
  validation: validate({ required: true }),
  isUnique: isSlugUnique,
};

export const PUBLISHED_AT_FIELD = {
  name: 'publishedAt',
  initialValue: getISODateString(),
  title: 'Date',
  type: 'date',
  validation: validate({ required: true }),
};

export const HERO_FIELD = {
  name: 'hero',
  title: 'Hero',
  type: 'array',
  validation: validate({ max: 1 }),
  description: 'The hero section of the page.',
  of: Object.keys(HERO_SCHEMAS).map((type: HeroSchemaName) => ({ type })),
};

export const MODULES_FIELD = {
  name: 'modules',
  title: 'Modules',
  type: 'array',
  description: 'Modules are the building blocks of a page.',
  of: Object.keys(MODULE_SCHEMAS).map((type: ModuleSchemaName) => ({ type })),
};

export const DIALOGS_FIELD = {
  name: 'dialogs',
  title: 'Dialogs',
  type: 'array',
  description:
    'Dialogs are the modal windows, used to present extra information. A dialog must be created before it can be linked to from a button inside module.',
  of: Object.keys(DIALOG_SCHEMAS).map((type: DialogSchemaName) => ({ type })),
};

export const ORDER_PUBLISHED_DESC = {
  title: 'Created ↑',
  name: 'publishedAtDesc',
  by: [{ field: 'publishedAt', direction: 'desc' }],
};

export const EMPTY_RICHTEXT_MODULE = {
  _type: 'module.richtext',
  _key: nanoid(),
  background: 'white',
  content: [
    {
      _type: 'block',
      _key: nanoid(),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: nanoid(),
          text: '',
          marks: [],
        },
      ],
    },
  ],
};

export const pageBase = {
  initialValue: {},
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {
        collapsible: true,
        collapse: true,
      },
    },
  ],
  fields: [
    TITLE_FIELD,
    SLUG_FIELD,
    SEO_FIELD,
    HERO_FIELD,
    MODULES_FIELD,
    DIALOGS_FIELD,
  ],
};
