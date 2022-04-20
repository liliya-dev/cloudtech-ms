import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { PageType } from '../../queries/page';
import { DialogBuilder } from '../ModuleBuilder/DialogBuilder';
import { HeroBuilder } from '../ModuleBuilder/HeroBuilder';
import { ModuleBuilder } from '../ModuleBuilder/ModuleBuilder';

export const DefaultPage = (props: PageType) => {
  const [hasDialogOpen, setHasDialogOpen] = useState<boolean>(false);
  return (
    <div>
      {props.hero && <HeroBuilder hero={props.hero} />}

      {Boolean(props?.modules?.length) && (
        <motion.div
          animate={{
            y: hasDialogOpen ? 20 : 0,
            opacity: hasDialogOpen ? 0.6 : 1,
          }}
          transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.5 }}
        >
          <ModuleBuilder items={props.modules} />
        </motion.div>
      )}
      {Boolean(props?.dialogs?.length) && (
        <DialogBuilder items={props.dialogs} onDialogOpenChange={setHasDialogOpen} />
      )}
    </div>
  );
};
