import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { ButtonProps } from '../../components/buttons/Button';
import { IconName } from '../../components/icons/Icons';
import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { MobileNav } from './MobileNav';
import { TopNav } from './TopNav';

export type NavItem = {
  label?: string;
  href?: string;
  current?: boolean;
  children?: {
    label?: string;
    href?: string;
    description?: string;
    icon?: IconName;
    current?: boolean;
  }[];
};

export type NavProps = {
  showSearch?: boolean;
  items: NavItem[];
  buttons: ButtonProps[];
};

export const Nav = ({ items, buttons, showSearch }: NavProps) => {
  const router = useRouter();
  const { screenWidth, breakpoint } = useBreakpoint();
  const scrollDirection = useScrollDirection();
  const scrollPosition = useScrollPosition();
  const showNav = scrollDirection === 'up' || scrollPosition !== 'middle';

  const navRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(92);

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);

  /**
   * Measure nav and create a spacer of equal height
   */

  useEffect(() => {
    if (!navRef.current) return;
    const navHeight = navRef.current.getBoundingClientRect().height;
    setSpacerHeight(navHeight);
  }, [navRef.current, breakpoint]);

  const onHamburgerClick = () => {
    setMobileNavIsOpen(true);
  };

  return (
    <div>
      <div style={{ height: spacerHeight }} className="invisible" />

      {screenWidth < BREAKPOINTS.lg && (
        <MobileNav
          items={items}
          buttons={buttons}
          open={mobileNavIsOpen}
          onOpenChange={setMobileNavIsOpen}
        />
      )}

      <TopNav
        items={items}
        buttons={buttons}
        onHamburgerClick={onHamburgerClick}
        showNav={showNav}
        ref={navRef}
        showSearch={showSearch}
      />
    </div>
  );
};
