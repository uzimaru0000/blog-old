import * as React from 'react';

export default <T extends HTMLElement>(
  opts?: IntersectionObserverInit
): [React.RefObject<T>, boolean] => {
  const ref = React.useRef<T>(null);
  const [isIntersection, setIntersection] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        setIntersection(true);
      }
    }, opts);
    if (ref.current !== null) observer.observe(ref.current);
    return () => ref.current !== null && observer.unobserve(ref.current);
  }, [ref, setIntersection]);

  return [ref, isIntersection];
};
