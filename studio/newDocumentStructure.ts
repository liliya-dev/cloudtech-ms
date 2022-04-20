import S from '@sanity/base/structure-builder';

import { SchemaName } from '../types.sanity';
import { isSingleton } from './utils/schemas/isSingleton';

export default [
  ...S.defaultInitialValueTemplateItems().filter(
    (item) => !isSingleton(item['spec'].id as SchemaName),
  ),
];
