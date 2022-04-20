import sanityClient from '@sanity/client';

import { config } from './config';

export const createLivePreviewFrontendClient = (previewToken: string) => {
  if (!previewToken) return null;
  return sanityClient({
    ...config,
    apiVersion: 'vX',
    useCdn: false,
    token: previewToken,
    ignoreBrowserTokenWarning: true,
  });
};
