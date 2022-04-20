import { Card, Text } from '@sanity/ui';
import React from 'react';

const Warning = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const { type } = props;

  return (
    <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
      <Text align="center" size={1}>
        {type.message}
      </Text>
    </Card>
  );
});

export default Warning;
