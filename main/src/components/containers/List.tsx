import * as React from 'react';
import styled from 'styled-components';
import Entry from '../Entry';
import media from 'styled-media-query';
import { Entry as EntryType, WithID } from '../../../../common/model';
import DummyEntry from '../DummyEntry';
import { useIntersection } from '../hooks';

interface Props {
  entries: WithID<EntryType>[];
  onEnd?: () => void;
  isLoading: boolean;
}

export default (props: Props) => {
  const ref = React.useRef(null);
  const isIntersection = useIntersection(ref.current);

  React.useEffect(() => {
    if (isIntersection && props.onEnd) {
      props.onEnd();
    }
  }, [isIntersection, props.onEnd]);

  return (
    <Wrapper>
      <InnerWrapper>
        {props.entries.length === 0
          ? [...Array(3)].map((_, i) => <DummyEntry key={i} />)
          : props.entries.map(x => (
              <Entry key={x.id} {...x} isExtend={false} />
            ))}
        {props.isLoading && <DummyEntry />}
      </InnerWrapper>
      <div ref={ref} />
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
