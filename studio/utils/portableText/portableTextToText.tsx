import { Block } from '@sanity/types';

export const blocksToText = (blocks: Block[]): string => {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return `[${block._type}]`;
      }
      return block.children.map((child) => child.text).join('\n');
    })
    .join('\n');
};
