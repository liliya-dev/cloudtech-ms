import React from 'react';

const schema = require('part:@sanity/base/schema').default;

export const getSchemas = (): {
  title: string;
  name: string;
  icon: React.ReactElement;
  singleton?: boolean;
}[] => {
  return schema
    .getTypeNames()
    .map((typeName) => schema.get(typeName))
    .filter(
      (type) =>
        type.type &&
        type.type.name === 'document' &&
        type.name.indexOf('sanity.') < 0,
    )
    .map(({ title, name, icon, singleton }) => ({
      title,
      name,
      icon,
      singleton,
    }));
};
