import * as React from 'react';
// import {useToggle} from 'react-use';

export default (
  dom: HTMLDivElement | null,
  opts?: IntersectionObserverInit
) => {
  // const [isIntersection, toggle] = useToggle(false)
    // https://github.com/streamich/react-use/blob/master/docs/useToggle.md
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



// // import {useToggle} from 'react-use';
//
// const useIntersection = (
//     dom: HTMLDivElement | null,
//     opts?: IntersectionObserverInit
// ) => {
//   // const [isIntersection, toggle] = useToggle(false)
//   // https://github.com/streamich/react-use/blob/master/docs/useToggle.md
//   const [isIntersection, setIntersection] = React.useState(false);
//
//   React.useEffect(() => {
//     const observer = new IntersectionObserver(([target]) => {
//       setIntersection(target.isIntersecting);
//     }, opts);
//     if (dom !== null) observer.observe(dom);
//     return () => dom !== null && observer.unobserve(dom);
//   }, [dom, setIntersection]);
//
//   return isIntersection;
// };
//
//
//
// export default (dom: HTMLDivElement | null, onEnd?: () => void) => {
//   const isIntersection = useIntersection(dom);
//
//   React.useEffect(() => {
//     if (isIntersection && onEnd) {
//       onEnd();
//     }
//   }, [isIntersection, onEnd]);
//
// };