import { useRouter } from 'next/dist/client/router';
import React from 'react';

import { Icon } from '../../components/icons/Icon';
import { Spinner } from '../../components/loaders/Spinner';
import { Seo } from '../../components/meta/Seo';
import { PageContext } from '../../context/PageContext';
import { ConfigType } from '../../queries/config';
import { FooterType } from '../../queries/footer';
import { NavigationType } from '../../queries/navigation';
import { PageType } from '../../queries/page';
import { SitemapType } from '../../queries/sitemap';
import { Footer } from '../Footer/Footer';
import { StaticFormBuilder } from '../ModuleBuilder/StaticFormBuilder';
import { Nav } from '../Nav/Nav';
import { DefaultPage } from './DefaultPage';

export type PageProps = {
  preview: boolean;
  previewLoading?: boolean;
  navigation: NavigationType;
  page: PageType;
  footer: FooterType;
  config: ConfigType;
  sitemap: SitemapType;
};

export const Page = ({
  preview,
  previewLoading = false,
  navigation,
  page,
  footer,
  config,
  sitemap,
}: PageProps) => {
  const router = useRouter();
  const pagePath = router.asPath;

  // set active state
  const navItems = navigation?.items?.map((item) => ({
    ...item,
    current: router.asPath === item.href,
    children: item.children?.map((subitem) => ({
      ...subitem,
      current: router.asPath === subitem.href,
    })),
  }));

  return (
    <PageContext.Provider value={{ preview, sitemap }}>
      <Seo page={page} config={config} sitemap={sitemap} preview={preview} />

      {preview && (
        <a
          href={`/api/exit-preview?redirect=${pagePath}`}
          className="text-base fixed top-4 right-4 z-50 flex gap-4 text-white bg-gray-800 transition-color hover:underline hover:bg-gray-900 items-center"
        >
          <span className="pl-3">preview mode</span>

          <span className="p-3 bg-gray-900">
            <span className="w-5 h-5 block">
              {previewLoading ? <Spinner /> : <Icon name="CloseIcon" />}
            </span>
          </span>
        </a>
      )}

      {navigation && !preview && (
        <Nav
          items={page.hideNav === true ? [] : navItems}
          buttons={page.hideNav === true ? [] : navigation.buttons}
          showSearch={page.hideNav !== true}
        />
      )}

      <DefaultPage {...page} />

      {footer && !preview && (
        <Footer
          links={page.hideFooter === true ? [] : footer.links}
          socials={page.hideFooter === true ? [] : footer.socials}
          copyright={footer.copyright}
        >
          {footer.form?.formId && (
            <StaticFormBuilder {...footer.form} className="w-80 flex-shrink" />
          )}
        </Footer>
      )}
    </PageContext.Provider>
  );
};
