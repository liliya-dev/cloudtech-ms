import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';
import React from 'react';

import { PageContext } from '../context/PageContext';
import { SitemapItemType } from '../queries/sitemap';

import '../style/plyr-custom.css';
import '../style/plyr.css';
import '../style/styles.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Introduction', 'Framework', 'Templates', 'Components', 'Modules'],
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    asPath: '/page1/page2/page3',
  },
};

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />
  ),
});

const DEMO_SITEMAP: SitemapItemType[] = [
  {
    _id: 'xx',
    _type: 'page.content',
    _updatedAt: '2022-01-04T14:26:24Z',
    path: '/page1',
    title: 'Page 1',
  },
  {
    _id: 'xx',
    _type: 'page.content',
    _updatedAt: '2022-01-04T15:03:13Z',
    path: '/page1/page2',
    title: 'Page 2',
  },
  {
    _id: 'xxx',
    _type: 'page.content',
    _updatedAt: '2022-01-04T15:03:13Z',
    path: '/page1/page2/page3',
    title: 'Page 3',
  },
];

export const decorators = [
  (Story) => {
    return (
      <PageContext.Provider
        value={{ preview: false, sitemap: DEMO_SITEMAP, id: 'xxx' }}
      >
        <Story />
      </PageContext.Provider>
    );
  },
];
