import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Dialog, DialogProps } from '../../components/Dialog/Dialog';
import { Video } from '../../components/video/Video';
import { VideoType } from '../../types';
import { DialogSchemaName } from '../../types.sanity';
import { PortableText } from './PortableText';
import { StaticFormBuilder } from './StaticFormBuilder';

export type DialogBuilderProps = {
  onDialogOpenChange?: (boolean) => void;
  items: {
    _type?: DialogSchemaName;
    _key?: string;
    slug?: string;
    content?: {}[];
    video?: VideoType;
    form?: {};
  }[];
};

export const DialogBuilder = ({
  items = [],
  onDialogOpenChange,
}: DialogBuilderProps) => {
  const router = useRouter();
  const [currentOpenSlug, setCurrentOpenSlug] = useState<string | null>(null);
  const dialogSlugs = items
    ?.filter(({ slug }) => slug?.trim().length)
    .map(({ slug }) => slug);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const hash = url.split('#')[1];
      if (!hash?.trim().length) setCurrentOpenSlug(null);
      if (dialogSlugs.indexOf(hash) > -1) setCurrentOpenSlug(hash);
    };

    router.events.on('hashChangeStart', handleRouteChange);
    handleRouteChange(location.href);
    return () => router.events.off('hashChangeStart', handleRouteChange);
  }, [dialogSlugs]);

  const onDialogClose = () => {
    const scrollY = window.scrollY;
    router.push(location.href.split('#')[0], null, { shallow: true });
    window.scrollTo(0, scrollY);
  };

  useEffect(
    () => onDialogOpenChange(Boolean(currentOpenSlug)),
    [onDialogOpenChange, currentOpenSlug],
  );

  const DIALOG_MODES = {
    'dialog.video': 'video',
    'dialog.richtext': 'content',
    'dialog.form': 'form',
  };

  return (
    <>
      {items
        ?.filter(({ slug }) => slug?.trim().length)
        .map((item) => (
          <div key={item._key}>
            <Dialog
              open={currentOpenSlug === item?.slug}
              onOpenChange={onDialogClose}
              mode={DIALOG_MODES[item._type] as DialogProps['mode']}
            >
              {item._type === 'dialog.richtext' && (
                <PortableText content={item.content} />
              )}
              {item._type === 'dialog.video' && (
                <figure>
                  <Video {...item.video} />
                </figure>
              )}

              {/* Form */}
              {item._type === 'dialog.form' && <StaticFormBuilder {...item.form} />}
            </Dialog>
          </div>
        ))}
    </>
  );
};

export const DialogBuilderMemo = React.memo(DialogBuilder);
