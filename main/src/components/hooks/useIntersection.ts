import * as React from 'react';

export default (
  dom: HTMLDivElement | null,
  opts?: IntersectionObserverInit
) => {
  const [isIntersection, setIntersection] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([target]) => {
      setIntersection(target.isIntersecting);
    }, opts);
    if (dom !== null) observer.observe(dom);
    return () => dom !== null && observer.unobserve(dom);
  }, [dom, setIntersection]);

  return isIntersection;
};
