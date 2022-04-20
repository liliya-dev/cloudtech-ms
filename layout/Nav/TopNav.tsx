import cx from 'classnames';
import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '../../components/buttons/Button';
import { Link } from '../../components/buttons/Link';
import { NavProps } from './Nav';

import LogoImage from '../../public/logo.svg';

export type TopNavProps = {
  showNav?: boolean;
  onHamburgerClick?: () => void;
} & NavProps;

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  ({ items, buttons, showNav = true, onHamburgerClick }, navRef) => {
    const [forceCloseSubmenus, setForceCloseSubmenus] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /**
     * Logic to close dropdowns when they're clicked
     */

    const onButtonClick = () => {
      wrapperRef.current.focus();
      setForceCloseSubmenus(true);
    };

    useEffect(() => {
      if (!setForceCloseSubmenus) return;
      setTimeout(() => setForceCloseSubmenus(false), 100);
    }, [forceCloseSubmenus]);

    return (
      <div ref={wrapperRef} tabIndex={-1}>
        <div
          className={cx(
            'fixed z-20 top-0 left-0 right-0 w-full transform transition-transform bg-white duration-500 bg-opacity-70',
            {
              ['-translate-y-full ease-in-out-cubic']: !showNav,
            },
          )}
        >
          <nav
            className={
              'flex gap-6 items-center max-w-2xl mx-auto py-2 md:py-3 lg:py-4 xl:py-5 px-4'
            }
            role="navigation"
            ref={navRef}
          >
            <NextLink href="/">
              <a className="h-12">
                <LogoImage className="h-full" />
              </a>
            </NextLink>

            {Boolean(items?.length) && (
              <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-8 ml-auto items-center">
                {items?.map(({ label, href, children, current }) => (
                  <li key={label} className="group relative">
                    {href ? (
                      <Link href={href} className="block hover:underline">
                        {label}
                      </Link>
                    ) : (
                      <button type="button">{label}</button>
                    )}

                    {/* TODO: better use Radix hover card or hover menu */}
                    {Boolean(children?.length) && (
                      <div
                        className={cx(
                          'transition-opacity',
                          'absolute bottom-0 left-0 w-64',
                          'transform scale-0 opacity-0 translate-y-full',
                          'group-focus-within:opacity-100 group-hover:opacity-100',
                          'group-focus-within:scale-100 group-hover:scale-100',
                          { ['pointer-events-none']: forceCloseSubmenus },
                        )}
                      >
                        <ul className={cx('translate-y-4', 'shadow-md')}>
                          {children?.map(({ label, icon, current, href }) => (
                            <li className="-mt-px bg-white p-3" key={label}>
                              <Link href={href} className="block hover:underline">
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <ul className="flex gap-2 xl:gap-4 items-center ml-auto lg:ml-4">
              {Boolean(buttons?.length) &&
                buttons?.map((button) => (
                  <li key={button.label}>
                    <div className="hidden md:block">
                      <Button {...button} />
                    </div>
                  </li>
                ))}

              <li
                className={cx('lg:hidden', {
                  ['hidden']: !Boolean(items?.length) && !Boolean(buttons?.length),
                })}
              >
                <Button
                  label=""
                  ariaLabel="Open navigation"
                  icon="MenuIcon"
                  onClick={onHamburgerClick}
                  size="lg"
                  theme="black"
                  plain
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  },
);
