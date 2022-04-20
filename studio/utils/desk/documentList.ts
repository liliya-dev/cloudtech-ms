import S from '@sanity/desk-tool/structure-builder';

import { SchemaName } from '../../../types.sanity';
import { getDocumentIcon } from '../document/getDocumentIcon';
import { getDocumentTitle } from '../document/getDocumentTitle';

type DocumentListProps = {
  type: SchemaName;
  title?: string;
  filter?: string;
  icon?: JSX.Element;
  createMenuTypes?: SchemaName[];
};

export function documentList({
  type,
  title,
  filter,
  icon,
  createMenuTypes,
}: DocumentListProps) {
  return S.listItem()
    .title(title || getDocumentTitle(type))
    .icon(icon || (getDocumentIcon(type) as any))
    .child((listItemId) =>
      S.documentList()
        .title(title || getDocumentTitle(type))
        .filter(filter || `_type == "${type}"`)
        .menuItems([...(S.documentTypeList(type).getMenuItems() as [])])
        .initialValueTemplates([
          ...((createMenuTypes || [type]).map((x) =>
            S.initialValueTemplateItem(x),
          ) as any),
        ]),
    );
}
