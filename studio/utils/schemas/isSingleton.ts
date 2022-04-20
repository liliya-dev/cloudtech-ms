import { SchemaName } from '../../../types.sanity';
import { getSchemas } from './getSchemas';

export const isSingleton = (type: SchemaName): boolean => {
  return Boolean(getSchemas().find(({ name }) => name === type)?.singleton);
};
