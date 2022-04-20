import { InfoOutlineIcon } from '@sanity/icons';
import { Box, Card, Flex, Grid, Heading } from '@sanity/ui';
import React from 'react';

import { DocumentIcon, ICONS, IconType } from '../../utils/DocumentIcon';
import { getSchemas } from '../../utils/schemas/getSchemas';

export default {
  title: '',
  name: 'mawla-engine',
  icon: InfoOutlineIcon,
  component: () => (
    <Card padding={4}>
      <Grid padding={4}>
        {/* schemas */}
        <Box>
          <Heading size={2}>Schemas</Heading>
          <p>{getSchemas().length} schema types.</p>

          <Grid gap={4} columns={8}>
            {getSchemas().map((schema) => (
              <Flex key={schema.name} gap={2}>
                {(schema.icon as any)?.()} {schema.name}
              </Flex>
            ))}
          </Grid>
        </Box>

        <div
          style={{
            border: '1px solid rgba(0,0,0,.1)',
            marginTop: 50,
            marginBottom: 50,
          }}
        />

        {/* icons */}
        <Box>
          <Heading size={2}>Document icons</Heading>
          <p>
            {Object.keys(ICONS).length} icons. See{' '}
            <a href="https://teenyicons.com">teenyicons.com</a>
          </p>

          <Grid gap={4} columns={8}>
            {Object.keys(ICONS).map((icon: IconType) => (
              <Flex
                key={icon}
                gap={2}
                align="flex-start"
                onClick={() => navigator.clipboard.writeText(icon)}
              >
                <DocumentIcon type={icon} />
                <span>{icon}</span>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Card>
  ),
};
