import S from '@sanity/desk-tool/structure-builder';

import { SchemaName } from '../../../types.sanity';
import { getDocumentIcon } from '../document/getDocumentIcon';
import { getDocumentTitle } from '../document/getDocumentTitle';

type GroupProps = {
  type?: SchemaName;
  title?: string;
  icon?: JSX.Element | any;
};

export function group({ type, title, icon }: GroupProps) {
  return S.listItem()
    .title(title || getDocumentTitle(type))
    .icon(icon || getDocumentIcon(type));
}
