import S from '@sanity/desk-tool/structure-builder';

import { SchemaName } from '../../../types.sanity';
import { FormView, PreviewView } from '../../deskStructure';
import { getDocumentIcon } from '../document/getDocumentIcon';
import { getDocumentTitle } from '../document/getDocumentTitle';

type SingletonProps = {
  id: string;
  type: SchemaName;
  icon?: JSX.Element;
  title?: string;
};

export function singleton({ id, type, title, icon }: SingletonProps) {
  const views: any[] = [FormView];
  if (type.indexOf('page.') === 0) {
    views.push(PreviewView);
  }

  return S.listItem()
    .title(title || getDocumentTitle(type))
    .icon(icon || (getDocumentIcon(type) as any))
    .id(id)
    .child(S.document().schemaType(type).documentId(id).views(views));
}
