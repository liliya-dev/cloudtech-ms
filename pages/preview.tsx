import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { createLivePreviewFrontendClient } from '../helpers/sanity/frontend';
import { useDebounce } from '../hooks/useDebounce';
import { Page } from '../layout/pages/Page';
import { ConfigType } from '../queries/config';
import { FooterType } from '../queries/footer';
import { NavigationType } from '../queries/navigation';
import { pageQuery, PageType } from '../queries/page';
import { SitemapType } from '../queries/sitemap';

export default function PreviewPage({ preview }) {
  const router = useRouter();
  const DELAY = 400;

  const [updateTicker, setUpdateTicker] = useState<number>(0);
  const debouncedUpdateTicker = useDebounce(updateTicker, DELAY);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);

  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const type = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type;

  const [page, setPage] = useState<PageType>(null);
  const [navigation] = useState<NavigationType>();
  const [footer] = useState<FooterType>(null);
  const [sitemap] = useState<SitemapType>([]);
  const [config] = useState<ConfigType>({} as ConfigType);
  const [frontendClient, setFrontendClient] = useState(null);

  useEffect(() => {
    if (!preview) router.push('/');
  }, [preview]);

  useEffect(() => {
    if (!preview) return;
    if (!id) return;
    let listener;

    /**
     * Get preview token from api with user credentials
     * because we don't want to store it in the frontend
     */

    async function getPreviewToken() {
      const userReq = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/users/me`,
        { credentials: 'include' },
      );
      const user = await userReq.json();
      if (!user?.id) return;

      const res = await fetch(`/api/get-preview-token`, {
        method: 'POST',
        body: JSON.stringify({ user }),
      });
      let { previewToken } = await res.json();
      previewToken = previewToken.replace(user.id, '');
      return previewToken;
    }

    /**
     * Create a listener to ping when the data needs to be refreshed
     */

    async function setupPreviewListener() {
      if (listener?.unsubscribe) listener.unsubscribe();
      const previewToken = await getPreviewToken();
      if (!previewToken) return;
      const query = `*[_id == "${id}" || _id == "drafts.${id}"]`;
      const frontendClient = await createLivePreviewFrontendClient(previewToken);
      listener = frontendClient
        .listen(query)
        .subscribe(() => setUpdateTicker((n) => n + 1));
      setFrontendClient(frontendClient);
      setUpdateTicker((n) => n + 1);
    }

    setupPreviewListener();

    return () => {
      if (listener?.unsubscribe) listener.unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    if (!preview) return;
    if (debouncedUpdateTicker === 0) return;
    setPreviewLoading(true);

    async function reload() {
      if (!frontendClient) return;

      // wait a bit longer to make sure we get the latest
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < DELAY);

      // get either the draft or the published id
      let previewId = id.startsWith('drafts.')
        ? id
        : debouncedUpdateTicker > 1
        ? `drafts.${id}`
        : id;

      const page = await frontendClient.fetch(pageQuery, {
        _id: previewId,
        _type: type,
        sitemap,
      });

      setPage(page);
      setPreviewLoading(false);
    }

    reload();
  }, [debouncedUpdateTicker, frontendClient, id, type, sitemap]);

  return (
    <div>
      <Page
        navigation={navigation}
        page={page}
        preview={preview}
        footer={footer}
        config={config}
        sitemap={sitemap}
        previewLoading={previewLoading}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return { props: { preview }, revalidate: 10 };
};
