import * as React from 'react';
import styled, { css } from 'styled-components';
import Entry from '../components/Entry';
import media from 'styled-media-query';
import { RouteComponentProps } from 'react-router-dom';
import { WithID, Entry as EntryType } from '../../common/model';
import { getEntry } from '../api';

const useIntersection = (
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

export default (props: RouteComponentProps<{ id: string }>) => {
  const [entry, setEntry] = React.useState<WithID<EntryType>>(null);
  const entryDOM = React.useRef<HTMLDivElement>(null);
  const isIntersection = useIntersection(entryDOM.current, {
    rootMargin: '-10%',
  });

  React.useEffect(() => {
    if (!props.match.params.id) return;
    getEntry(props.match.params.id).then(x => setEntry(x));
  }, [props.match.params.id, setEntry]);

  return (
    <>
      <CatchUp image={entry && entry.image} isBlur={isIntersection} />
      <Wrapper ref={entryDOM}>
        <InnerWrapper>
          {entry && <Entry {...entry} isExtend={true} />}
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--color-white);
`;

const InnerWrapper = styled.div`
  ${media.greaterThan('medium')`
    margin: 0 auto;
    width: 90%;
    max-width: 980px;
  `}

  ${media.lessThan('medium')`
    width: 100%;
  `}
`;

const CatchUp = styled.div<{ image: string; isBlur: boolean }>`
  position: sticky;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: calc(100vh - 64px);
  background: ${({ image }) => `url(${image})`};
  background-size: cover;
  ${({ isBlur }) =>
    isBlur &&
    css`
      filter: blur(8px);
    `};
  transition: 300ms ease;
`;
