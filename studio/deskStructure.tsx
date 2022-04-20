import S from '@sanity/desk-tool/structure-builder';
import React from 'react';

import { DocumentIcon } from './utils/DocumentIcon';
import { documentList } from './utils/desk/documentList';
import { group } from './utils/desk/group';
import { list } from './utils/desk/list';
import { singleton } from './utils/desk/singleton';
import { Preview } from './views/Preview';

export default () =>
  S.list()
    .title('Website')
    .items([
      group({
        title: 'Pages',
        icon: () => <DocumentIcon type="mawla" />,
      }).child(
        list({ title: 'Pages' }).items([
          singleton({ id: 'page_homepage', type: 'page.home' }),

          S.divider(),
          documentList({ type: 'page.content', title: 'Content pages' }),
          documentList({ type: 'page.landing', title: 'Landing pages' }),
        ]),
      ),

      singleton({ id: 'navigation', type: 'navigation' }),
      singleton({ id: 'footer', type: 'footer' }),
      S.divider(),
      singleton({ id: 'config', type: 'config' }),
      singleton({ id: 'sitemap', type: 'sitemap' }),
      documentList({ type: 'redirect', title: 'Redirects' }),
      documentList({ type: 'form.static', title: 'Forms' }),
      S.divider(),
      singleton({ id: 'page_notfound', type: 'page.notfound' }),
    ]);

export const getDefaultDocumentNode = (props) => {
  const { schemaType } = props;

  // add preview iframe for pages
  const views: any[] = [FormView];
  if (schemaType.indexOf('page.') === 0) {
    views.push(PreviewView);
  }
  return S.document().views(views);
};

export const FormView = S.view.form();
export const PreviewView = S.view
  .component(Preview)
  .title('Live preview')
  .icon(() => <DocumentIcon type="preview" />);
