import NextLink from 'next/link';
import React from 'react';

import { Button } from '../../components/buttons/Button';
import { ColorType as ButtonColorType } from '../../components/buttons/ButtonOptions';
import { Link } from '../../components/buttons/Link';
import { IconName } from '../../components/icons/Icons';
import { BackgroundProps } from '../../components/module/Background';
import { Wrapper } from '../../components/module/Wrapper';

import LogoImage from '../../public/logo.svg';

export type FooterProps = {
  socials: { label?: string; href?: string; icon: IconName }[];
  links: { title?: string; items: { label?: string; href?: string }[] }[];
  copyright?: string;
  children?: React.ReactElement | React.ReactNode;
} & Partial<BackgroundProps>;

const contrastColors = {
  white: 'black',
  black: 'white',
};

export const Footer = ({
  socials,
  links,
  children,
  copyright = '©',
  background = 'white',
}: FooterProps) => {
  return (
    <Wrapper background={background}>
      <div className="flex flex-col xl:flex-row gap-8 border-t border-black border-opacity-10 pt-16">
        <div className="flex flex-col gap-8 pr-16">
          <div className="h-10">
            <NextLink href="/">
              <a>
                <LogoImage className="h-full" />
              </a>
            </NextLink>
          </div>

          {children}
        </div>

        <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          {links?.map(({ title, items }) => (
            <div className="mb-6" key={title}>
              <h2 className="uppercase font-medium text-sm mb-4 opacity-80">
                {title}
              </h2>

              <ul className="flex flex-col gap-4">
                {items?.map(({ label, href }) => (
                  <li key={label} className="opacity-60">
                    <Link href={href} className="block hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {copyright && (
        <div className="border-t border-black border-opacity-10 xl:text-center mt-12 py-8 text-md">
          {Boolean(socials?.length) && (
            <ul className="flex gap-4 justify-center">
              <li className="mr-10">{copyright}</li>
              {socials?.map(({ label, href, icon }) => (
                <li key={label} className="opacity-75">
                  <Button
                    href={href}
                    ariaLabel={label}
                    label=""
                    theme={contrastColors[background] as ButtonColorType}
                    icon={icon}
                    compact
                    plain
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Wrapper>
  );
};
