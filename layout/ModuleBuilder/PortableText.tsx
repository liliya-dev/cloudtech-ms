import cx from 'classnames';
import NextLink from 'next/link';
import React from 'react';

import { Accordion } from '../../components/Accordion/Accordion';
import { AnimateInView } from '../../components/animation/AnimateInView';
import { ButtonGroup } from '../../components/buttons/ButtonGroup';
import { FigCaption } from '../../components/images/FigCaption';
import { Image } from '../../components/images/Image';
import { Video } from '../../components/video/Video';

const BlockContent = require('@sanity/block-content-to-react');

export type PortableTextProps = {
  content: {};
};

const serializers = {
  types: {
    'image.simple'({ node }) {
      return (
        <AnimateInView className="not-prose">
          <figure
            className={cx({
              ['shadow-textimage-screenshot']: node.type === 'screenshot',
            })}
          >
            <Image {...node.image} className="rounded-md" />
            <FigCaption caption={node.caption} />
          </figure>
        </AnimateInView>
      );
    },
    video({ node }) {
      return (
        <AnimateInView className="not-prose">
          <figure>
            <Video {...node.video} />
            <FigCaption caption={node.caption} />
          </figure>
        </AnimateInView>
      );
    },
    buttons({ node }) {
      return (
        <div className="not-prose">
          <ButtonGroup {...node} />
        </div>
      );
    },
    accordion({ node }) {
      return (
        <div className="not-prose">
          <Accordion
            items={node.items?.map((item) => ({
              title: item.title,
              content: <PortableText content={item.content} />,
            }))}
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ mark, children }) => {
      if (mark.href?.indexOf('/') === 0 || mark.href?.indexOf('#') === 0) {
        return (
          <NextLink href={mark.href} shallow={mark.href?.indexOf('#') === 0}>
            <a>{children}</a>
          </NextLink>
        );
      }
      {
        mark.href;
      }
      return <a href={mark.href}>{children}</a>;
    },
  },
  list: ({ type, children }) => {
    if (type === 'bullet') return <ul>{children}</ul>;
    if (type === 'number') return <ol>{children}</ol>;
  },
};

export const PortableText = ({ content = [] }: PortableTextProps) => {
  if (!content) return null;
  return <BlockContent blocks={content} serializers={serializers} />;
};

export const PortableTextMemo = React.memo(PortableText);
