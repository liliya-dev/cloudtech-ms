import { SchemaName } from '../../../types.sanity';
import { getSchemas } from '../schemas/getSchemas';

export const getDocumentTitle = (schemaType: SchemaName): string => {
  return getSchemas().find(({ name }) => schemaType === name)?.title;
};
