import * as React from 'react';
import styled from 'styled-components';
import Entry from '../components/Entry';
import media from 'styled-media-query';
import { getEntries } from '../api';
import { Entry as EntryType, WithID } from '../../common/model';
import DummyEntry from '../components/DummyEntry';

export default () => {
  const [entries, setEntries] = React.useState<WithID<EntryType>[]>([]);

  React.useEffect(() => {
    getEntries().then(x => setEntries(x));
  }, [setEntries]);

  return (
    <Wrapper>
      <InnerWrapper>
        {entries.length === 0
          ? [...Array(3)].map(_ => <DummyEntry />)
          : entries
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(x => <Entry key={x.id} {...x} isExtend={false} />)}
      </InnerWrapper>
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
  `}
`;
