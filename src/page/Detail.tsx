import * as React from 'react';
import styled, { css } from 'styled-components';
import Entry from '../components/Entry';
import media from 'styled-media-query';
import { RouteComponentProps } from 'react-router-dom';
import { WithID, Entry as EntryType } from '../../common/model';
import { getEntry } from '../api';
import Share from '../components/Share';
import { IconName } from '@fortawesome/fontawesome-svg-core';

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
  const shareLink = entry
    ? encodeURI(`https://blog.uzimaru.com/share/${entry.id}`)
    : '';

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
        <ShareWrapper>
          <Share
            icon={['fab', 'facebook']}
            url={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
            color="#3B5998"
          />
          <Share
            icon={['fab', 'twitter']}
            url={`https://twitter.com/intent/tweet?url=${shareLink}&text=${entry &&
              entry.title}`}
            color="#1DA1F2"
          />
          <Share
            icon={['fab', 'get-pocket']}
            url={`https://getpocket.com/save?${shareLink}`}
            color="#EE4056"
          />
        </ShareWrapper>
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

const ShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0;

  & a {
    margin-right: 3rem;
  }

  & a:last-child {
    margin-right: 0;
  }
`;
