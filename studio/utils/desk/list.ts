import S from '@sanity/desk-tool/structure-builder';

import { SchemaName } from '../../../types.sanity';
import { getDocumentTitle } from '../document/getDocumentTitle';

type ListProps = { type?: SchemaName; title?: string };

export function list({ type, title }: ListProps) {
  return S.list().title(title || getDocumentTitle(type));
}
