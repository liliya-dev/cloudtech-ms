import React from 'react';

import { DocumentIcon } from '../../utils/DocumentIcon';
import buttonSchema from '../objects/button';

const INTERNAL_FIELD = buttonSchema.fields.find(({ name }) => name === 'internal');
const EXTERNAL_FIELD = buttonSchema.fields.find(({ name }) => name === 'external');
const DIALOG_FIELD = buttonSchema.fields.find(({ name }) => name === 'dialog');
const FILE_FIELD = buttonSchema.fields.find(({ name }) => name === 'file');
const DOWNLOAD_FIELD = buttonSchema.fields.find(({ name }) => name === 'download');

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: () => <DocumentIcon type="link" />,
  fields: [INTERNAL_FIELD, EXTERNAL_FIELD, DIALOG_FIELD, FILE_FIELD, DOWNLOAD_FIELD],
};
