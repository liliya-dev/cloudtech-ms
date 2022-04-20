import { BreadcrumbJsonLd, LogoJsonLd, NextSeo } from 'next-seo';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { getBreadCrumbForPath } from '../../helpers/sitemap/getBreadCrumbForPath';
import { ConfigType } from '../../queries/config';
import { PageType } from '../../queries/page';
import { SitemapType } from '../../queries/sitemap';
import { ModuleSchemaName } from '../../types.sanity';
import { getResponsiveImageUrl } from '../images/Image';

export type SeoProps = {
  config?: ConfigType;
  page?: PageType;
  sitemap?: SitemapType;
  preview?: boolean;
};

export const Seo = ({ config, page, sitemap, preview }: SeoProps) => {
  const router = useRouter();

  useEffect(() => {
    if (preview) return;
    if (config?.gtmid) TagManager.initialize({ gtmId: config.gtmid });
  }, [config?.gtmid, preview]);

  if (!config?.seo || !page || !sitemap) return null;

  const pagePath = router.asPath;

  const baseUrl = `https://${config.domain}`;
  const seoTitle = `${preview ? 'Preview mode 👀 - ' : ''}${
    page.seo?.title || page.title
  }`;
  const seoDescription =
    page.description || page.seo?.description || config.seo?.description;
  const seoCanonical = `${baseUrl}${pagePath}`;

  const hero =
    page?.hero?.[0] ||
    page?.modules?.find(
      ({ _type }: { _type: ModuleSchemaName }) => _type === 'module.textimage',
    );

  const seoImageObj =
    page.image || page.seo?.image || hero?.image || config.seo?.image;

  const seoImage = {
    url: getResponsiveImageUrl({
      src: seoImageObj.src,
      width: 1200,
      height: 630,
      crop: seoImageObj.crop,
      hotspot: seoImageObj.hotspot,
    }),
    width: 1200,
    height: 630,
    alt: seoImageObj.alt || '',
  };

  const brandJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: config.name,
    description: config.seo.description,
    logo: `${baseUrl}/logo.svg`,
    URL: baseUrl,
    sameAs: config.socials,
  };

  const breadCrumb = getBreadCrumbForPath(pagePath, sitemap);

  return (
    <>
      <NextSeo
        title={seoTitle}
        titleTemplate={`%s - ${config.name}`}
        description={seoDescription}
        canonical={seoCanonical}
        openGraph={{
          type: 'website',
          url: seoCanonical,
          title: seoTitle,
          description: seoDescription,
          images: [seoImage],
          site_name: config.name,
        }}
        twitter={{
          handle: config.twitter?.handle,
          site: config.twitter?.url,
          cardType: 'summary_large_image',
        }}
      />

      <LogoJsonLd logo={`${baseUrl}/logo.svg`} url={baseUrl} />

      {Boolean(breadCrumb?.length) && (
        <BreadcrumbJsonLd
          itemListElements={breadCrumb.map(({ title, path }, index) => ({
            position: index + 1,
            name: title,
            item: `${baseUrl}${path}`,
          }))}
        />
      )}

      <NextHead>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd, null, 2) }}
        />
      </NextHead>
    </>
  );
};
