import type { GetStaticProps } from 'next';
import React from 'react';

import { getClient } from '../helpers/sanity/server';
import { Page } from '../layout/pages/Page';
import { ConfigType, configQuery } from '../queries/config';
import { footerQuery, FooterType } from '../queries/footer';
import { navigationQuery, NavigationType } from '../queries/navigation';
import { pageQuery, PageType } from '../queries/page';
import { SitemapItemType, sitemapQuery, SitemapType } from '../queries/sitemap';

export default function Custom404({
  config,
  navigation,
  footer,
  preview,
  sitemap,
  page,
}) {
  return (
    <Page
      navigation={navigation}
      page={page}
      preview={preview}
      footer={footer}
      config={config}
      sitemap={sitemap}
    />
  );
}

type StaticProps = {
  config: ConfigType;
  footer: FooterType;
  navigation: NavigationType;
  page: PageType;
  preview?: boolean;
  revalidate?: number;
  sitemap: SitemapType;
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  // fetch sitemap
  const sitemap: SitemapType = await getClient(preview).fetch(sitemapQuery);

  // fetch config
  const config: ConfigType = await getClient(preview).fetch(configQuery);

  // fetch navigation
  const navigation: NavigationType = await getClient(preview).fetch(
    navigationQuery,
    { sitemap },
  );

  // fetch page
  const notFoundPage: SitemapItemType = {
    _id: 'page_notfound',
    _type: 'page.notfound',
    title: '',
    path: '',
    _updatedAt: '',
  };
  const page = await getClient(preview).fetch(pageQuery, {
    sitemap,
    ...notFoundPage,
  });

  // fetch navigation
  const footer: FooterType = await getClient(preview).fetch(footerQuery, {
    sitemap,
  });

  // return object
  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    preview,
    sitemap,
  };

  return { props, revalidate: 10 };
};
