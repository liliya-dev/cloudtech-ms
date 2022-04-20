import { Stack, Text, Spinner, Card, TabList, Tab, TabPanel } from '@sanity/ui';
import sanityClient from 'part:@sanity/base/client';
import { IntentLink } from 'part:@sanity/base/router';
import React, { useEffect, useState } from 'react';

import { SitemapItemType, sitemapQuery } from '../../queries/sitemap';

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' });

export const Sitemap = () => {
  const [tree, setTree] = useState<SitemapItemType[]>([]);
  const [state, setState] = useState<'loading' | 'ready'>('loading');
  const [result, setResult] = useState<SitemapItemType[]>([]);
  const [currentTab, setCurrentTab] = useState<'sitemap' | 'query' | 'result'>(
    'sitemap',
  );

  useEffect(() => {
    async function fetchTree() {
      const result = await client.fetch(sitemapQuery);
      setResult(result);
      setTree(
        result
          .filter((item) => Boolean(item.path))
          .sort((a, b) => a.path?.localeCompare(b.path)),
      );

      setState('ready');
    }
    fetchTree();
  }, []);

  return (
    <div className="sitemap">
      {state === 'loading' && <Spinner muted />}

      {state === 'ready' && (
        <Card>
          <TabList space={2}>
            <Tab
              aria-controls="sitemap-panel"
              id="sitemap-tab"
              label="Sitemap"
              onClick={() => setCurrentTab('sitemap')}
              selected={currentTab === 'sitemap'}
            />
            <Tab
              aria-controls="query-panel"
              id="query-tab"
              label="GROQ Query"
              onClick={() => setCurrentTab('query')}
              selected={currentTab === 'query'}
            />
            <Tab
              aria-controls="result-panel"
              id="result-tab"
              label="Raw JSON"
              onClick={() => setCurrentTab('result')}
              selected={currentTab === 'result'}
            />
          </TabList>

          <TabPanel
            aria-labelledby="sitemap-tab"
            hidden={currentTab !== 'sitemap'}
            id="content-panel"
          >
            <Card marginTop={2}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {tree?.map(({ title, path, _id, _type }) => {
                  const depth = path.split('/').length - 2;

                  return (
                    <li key={_id}>
                      <Stack
                        space={3}
                        marginBottom={4}
                        style={{
                          border: '1px solid #ccc',
                          padding: 12,
                          marginLeft: depth * 24,
                          background: depth === 0 ? '#f9f9f9' : 'white',
                          borderRadius: 2,
                        }}
                      >
                        <Text weight="semibold">
                          <IntentLink
                            intent="edit"
                            params={{ id: _id, type: _type }}
                            style={{ color: '#111' }}
                          >
                            {title}
                          </IntentLink>
                        </Text>
                        {path && <Text size={1}>{path}</Text>}
                      </Stack>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </TabPanel>

          <TabPanel
            aria-labelledby="query-tab"
            hidden={currentTab !== 'query'}
            id="query-panel"
          >
            <Card marginTop={2} style={{ overflow: 'auto' }}>
              <pre>
                <code>{sitemapQuery}</code>
              </pre>
            </Card>
          </TabPanel>

          <TabPanel
            aria-labelledby="result-tab"
            hidden={currentTab !== 'result'}
            id="result-panel"
          >
            <Card marginTop={2}>
              <pre>
                <code>{JSON.stringify(result, null, 2)}</code>
              </pre>
            </Card>
          </TabPanel>
        </Card>
      )}
    </div>
  );
};
