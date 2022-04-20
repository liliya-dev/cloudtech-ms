import { pick } from './helpers/utils/object';

export const SCHEMAS = {
  'dialog.form': '',
  'dialog.richtext': '',
  'dialog.video': '',
  'form.static': '',
  'hero.visual': '',
  'module.accordion': '',
  'module.divider': '',
  'module.richtext': '',
  'module.textimage': '',
  'module.video': '',
  'page.content': '',
  'page.home': '',
  'page.landing': '',
  'page.notfound': '',
  config: '',
  footer: '',
  navigation: '',
  redirect: '',
  sitemap: '',
};

export type SchemaName = keyof typeof SCHEMAS;

export const LINKABLE_SCHEMAS = pick(
  SCHEMAS,
  'page.content',
  'page.landing',
  'page.home',
);

export const MODULE_SCHEMAS = pick(
  SCHEMAS,
  'module.accordion',
  'module.divider',
  'module.richtext',
  'module.textimage',
  'module.video',
);

export type LinkableSchemaName = keyof typeof LINKABLE_SCHEMAS;

export type ModuleSchemaName = keyof typeof MODULE_SCHEMAS;

export const HERO_SCHEMAS = pick(SCHEMAS, 'hero.visual');

export type HeroSchemaName = keyof typeof HERO_SCHEMAS;

export const DIALOG_SCHEMAS = pick(
  SCHEMAS,
  'dialog.richtext',
  'dialog.video',
  'dialog.form',
);

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

export const FORM_SCHEMAS = pick(SCHEMAS, 'form.static');

export type FormSchemaName = keyof typeof FORM_SCHEMAS;

/**
 * Sanity types
 */

export type SanityFieldType = {
  name: string;
  title: string;
  type: string;
  validation?: (Rule: any) => any[];
  inputComponent?: React.ReactElement | React.ForwardRefExoticComponent<any>;
  fieldset?: string;
  description?: string;
  initialValue?: unknown;
  layout?: string;
  hidden?: boolean | ((props: any) => boolean);
  options?: {};
};

export type SanityFieldsetType = {
  name: string;
  title?: string;
  description?: string;
  options?: {
    collapsable?: boolean;
    collapsed?: boolean;
    columns?: number;
  };
};

export type SanitySchemaType = {
  type: 'object' | 'document';
  name?: string;
  title?: string;
  description?: string;
  icon?: React.ComponentType;
  fieldsets?: SanityFieldsetType[];
  groups?: SanityFieldsetType[];
  fields: SanityFieldType[];
  initialValue?: {};
  preview?: {
    select?: {};
    prepare?: (props: unknown) => {
      title?: string;
      subtitle?: string;
      media?: React.ReactElement;
    };
  };
};
