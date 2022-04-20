import { SchemaName } from '../../../types.sanity';
import { getSchemas } from '../schemas/getSchemas';

export const getDocumentIcon = (schemaType: SchemaName): JSX.Element => {
  return getSchemas().find(({ name }) => schemaType === name)?.icon || null;
};
