import React from 'react';

import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { pageBase } from './_page';

export const SCHEMA_NAME: SchemaName = 'page.home';

export default {
  name: SCHEMA_NAME,
  title: 'Homepage',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="homepage" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields.filter(({ name }) => name !== 'slug')],
};
