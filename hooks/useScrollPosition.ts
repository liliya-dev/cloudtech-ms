import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<
    'top' | 'bottom' | 'middle' | 'almost-top' | 'almost-bottom'
  >(null);

  useEffect(() => {
    function onScroll() {
      const scroll: number = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;

      if (scroll === 0) {
        return setScrollPosition('top');
      } else if (scroll < windowHeight * 0.25) {
        return setScrollPosition('almost-top');
      } else if (scroll + windowHeight === documentHeight) {
        return setScrollPosition('bottom');
      } else if (scroll >= documentHeight - windowHeight * 1.5) {
        return setScrollPosition('almost-bottom');
      } else {
        return setScrollPosition('middle');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return scrollPosition;
}
