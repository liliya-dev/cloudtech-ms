import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { getClient } from '../helpers/sanity/server';
import { LoadingPage } from '../layout/pages/LoadingPage';
import { Page } from '../layout/pages/Page';
import { ConfigType, configQuery } from '../queries/config';
import { footerQuery, FooterType } from '../queries/footer';
import { navigationQuery, NavigationType } from '../queries/navigation';
import { pageQuery, PageType } from '../queries/page';
import { sitemapQuery, SitemapType } from '../queries/sitemap';

const SlugPage = ({
  config,
  navigation,
  footer,
  page,
  preview,
  sitemap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!page || router.isFallback) return <LoadingPage />;

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
};

export default SlugPage;

type StaticProps = {
  config: ConfigType;
  footer: FooterType;
  navigation: NavigationType;
  notFound?: boolean;
  page: PageType;
  preview?: boolean;
  revalidate?: number;
  sitemap: SitemapType;
};

/**
 * Get static props:
 * - sitemap for resolving all links
 * - navigation
 * - page
 * - footer
 */

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const { slug = '' } = params;
  const path = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`;

  // fetch sitemap
  const sitemap: SitemapType = await getClient(preview).fetch(sitemapQuery);

  if (!sitemap.filter(Boolean).length) return { notFound: true };

  // get draft page or published page in preview mode
  const sitemapItem = preview
    ? sitemap.find((item) => item.path === path && item._id.startsWith(`drafts.`)) ||
      sitemap.find((item) => item.path === path)
    : // get published page in production mode
      sitemap.find((item) => item.path === path);

  if (!sitemapItem) return { notFound: true };

  // fetch config
  const config: ConfigType = await getClient(preview).fetch(configQuery);

  // fetch navigation
  let navigation: NavigationType = await getClient(preview).fetch(navigationQuery, {
    sitemap,
  });

  // fetch navigation
  const footer: FooterType = await getClient(preview).fetch(footerQuery, {
    sitemap,
  });

  // fetch page
  const page = await getClient(preview).fetch(pageQuery, {
    ...sitemapItem,
    sitemap,
  });

  if (page.navigation) navigation = page.navigation;

  if (!page) return { notFound: true };

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

/**
 * Static paths
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const sitemap: SitemapType = await getClient(false).fetch(sitemapQuery);

  return {
    paths: sitemap.filter(Boolean).map(({ path }) => ({
      params: { slug: path.split('/').splice(1) },
    })),
    fallback: true,
  };
};
