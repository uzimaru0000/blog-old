import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import DummyEntry from '../DummyEntry';
import { useIntersection } from '../../lib/hooks';

interface Props {
  onEnd?: () => void;
  isLoading: boolean;
}

export default (props: React.PropsWithChildren<Props>) => {
  const [ref, isIntersection] = useIntersection<HTMLDivElement>();

  React.useEffect(() => {
    if (isIntersection && props.onEnd) {
      props.onEnd();
    }
  }, [isIntersection, props.onEnd]);

  return (
    <Wrapper>
      <InnerWrapper>
        {props.children}
        {props.isLoading && <DummyEntry />}
      </InnerWrapper>
      <div ref={ref}></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-base);
`;

const InnerWrapper = styled.div`
  ${media.greaterThan('medium')`
    margin: 0 auto;
    width: 90%;
    max-width: 980px;
  `}

  ${media.lessThan('medium')`
    width: 100%;
    padding: 16px;
  `}
`;
