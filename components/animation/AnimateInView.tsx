import { motion } from 'framer-motion';
import React, { useRef } from 'react';

import { PageContext } from '../../context/PageContext';
import { useInView } from '../../hooks/useInView';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export type AnimateInViewProps = {
  children: React.ReactElement | React.ReactNode;
  threshold?: number;
  y?: number;
  x?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  disabled?: boolean;
  duration?: number;
};

export const AnimateInView = ({
  children,
  threshold = 0.01,
  y = 0,
  x = 0,
  delay = 0,
  once = false,
  className,
  disabled,
  duration = 0.5,
}: AnimateInViewProps) => {
  const { preview } = React.useContext(PageContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();
  const inView = useInView({
    elementRef: wrapperRef,
    threshold,
    once,
  });

  if (disabled) return <div className={className}>{children}</div>;

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        ease: [0.645, 0.045, 0.355, 1.0],
        delay,
      },
    },
    hidden: {
      opacity: 0,
      y: scrollDirection === 'up' ? y * -1 : y,
      x: x,
      transition: {
        duration: duration,
        ease: [0.645, 0.045, 0.355, 1.0],
        delay: delay * -1,
      },
    },
  };

  return (
    <motion.div
      ref={wrapperRef}
      animate={inView || preview ? 'visible' : 'hidden'}
      initial="hidden"
      exit="hidden"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
