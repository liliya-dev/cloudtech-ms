// CustomRichTextEditor.js
import blockTools from '@sanity/block-tools';
import { BlockEditor } from 'part:@sanity/form-builder';
import React from 'react';

const { nanoid } = require('nanoid');

export const CustomRichTextEditor = (props) => (
  <BlockEditor {...props} onPaste={handlePaste} />
);

function handlePaste(input) {
  const { event, type, path } = input;
  const html = event.clipboardData.getData('text/html');

  if (html) {
    const blocks = blockTools.htmlToBlocks(html, type, {
      rules: [
        {
          deserialize(el, next, block) {
            if (el.tagName.toLowerCase() != 'a') return undefined;

            const href = el.getAttribute('href');
            if (!href) {
              return next(el.childNodes);
            }
            let markDef = {
              _key: nanoid(),
              _type: 'link',
              external: href,
            };
            return {
              _type: '__annotation',
              markDef: markDef,
              children: next(el.childNodes),
            };
          },
        },
      ],
    });
    // return an insert patch
    return { insert: blocks, path };
  }
  return undefined;
}
