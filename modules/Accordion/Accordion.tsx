import React from 'react';

import {
  AccordionItemType,
  Accordion as AccordionComponent,
} from '../../components/Accordion/Accordion';
import { BackgroundProps } from '../../components/module/Background';
import { Title } from '../../components/module/Title';
import { Wrapper } from '../../components/module/Wrapper';

export type AccordionProps = {
  title?: string;
  items?: AccordionItemType[];
} & Partial<BackgroundProps>;

export const Accordion = ({ title, background, items = [] }: AccordionProps) => {
  return (
    <Wrapper background={background} id={title}>
      {title && (
        <div className="mb-10 md:mb-14 text-center">
          <Title size="xl">{title}</Title>
        </div>
      )}
      {Boolean(items?.length) && <AccordionComponent items={items} />}
    </Wrapper>
  );
};

export const AccordionMemo = React.memo(Accordion);
