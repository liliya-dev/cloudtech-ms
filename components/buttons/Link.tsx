import NextLink from 'next/link';
import React from 'react';

import { isInternalLink } from '../../helpers/sitemap/isInternalLink';

export type LinkProps = {
  href: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
};

export const Link = ({ href, children, className }: LinkProps) => {
  if (isInternalLink(href)) {
    return (
      <NextLink href={href} shallow={href?.indexOf('#') === 0}>
        <a className={className}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export const LinkMemo = React.memo(Link);
