import * as RadixDialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { Button } from '../../components/buttons/Button';
import { Link } from '../../components/buttons/Link';
import { Icon } from '../../components/icons/Icon';
import { NavProps } from './Nav';

export type MobileNavProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & NavProps;

export const MobileNav = ({
  items,
  buttons,
  open,
  onOpenChange,
}: MobileNavProps) => {
  const onButtonClick = () => {
    onOpenChange(false);
  };

  return (
    <div className={cx('radix-dialog', { ['hidden']: !open })}>
      <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
        <RadixDialog.Overlay className="relative z-50">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 w-screen h-screen"
            animate={{ opacity: 0.5 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'circOut', duration: 2 }}
          />
        </RadixDialog.Overlay>
        <RadixDialog.Content className="z-50 fixed top-0 right-0 w-85vw max-w-xs h-screen">
          <motion.div
            animate={{ x: open ? 0 : '100vw' }}
            initial={{ x: '100vw' }}
            exit={{ y: 0 }}
            transition={{ ease: [0.215, 0.61, 0.355, 1.0], duration: 0.25 }}
            className="h-full"
          >
            <motion.div
              className="h-full"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'circOut' }}
            >
              <RadixDialog.Title className="sr-only">Navigation</RadixDialog.Title>
              <RadixDialog.Close className="py-3 px-3 text-gray-600 hover:text-gray-700 bg-white hover:bg-gray-50 transition-colors absolute top-0 right-0">
                <Icon name="CloseIcon" className="text-current w-5 h-5" />
              </RadixDialog.Close>

              <div className="h-full overflow-y-auto overflow-scrolling-touch bg-white select-none shadow-2xl text-xl">
                {Boolean(items?.length) && (
                  <ul className="pt-7 divide-y divide-grey-50">
                    {items?.map(({ label, href, children, current }) => (
                      <li key={label} className="group -mt-px">
                        {href ? (
                          <Link href={href} className="block hover:underline p-4">
                            {label}
                          </Link>
                        ) : (
                          <span className="block p-4">{label}</span>
                        )}

                        {Boolean(children?.length) && (
                          <ul className="mb-3">
                            {children?.map(({ label, icon, current, href }) => (
                              <li key={label} className="-mt-px pl-2">
                                <Link
                                  href={href}
                                  className="block hover:underline p-4"
                                >
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-3 p-4 flex flex-col gap-2">
                  {Boolean(buttons?.length) &&
                    buttons?.map((button) => (
                      <li key={button.label}>
                        <div className="">
                          <Button
                            {...button}
                            stretch
                            align="center"
                            onClick={onButtonClick}
                            theme="white"
                            plain={false}
                            compact={false}
                            size="lg"
                          />
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="h-16 bg-red-white" />
              </div>
            </motion.div>
          </motion.div>
        </RadixDialog.Content>
      </RadixDialog.Root>
    </div>
  );
};
