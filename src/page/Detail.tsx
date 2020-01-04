import * as React from 'react';
import styled from 'styled-components';
import Entry from '../components/Entry';
import media from 'styled-media-query';
import { RouteComponentProps } from 'react-router-dom';
import { WithID, Entry as EntryType } from '../../common/model';
import { getEntry } from '../api';

export default (props: RouteComponentProps<{ id: string }>) => {
  const [entry, setEntry] = React.useState<WithID<EntryType>>(null);

  React.useEffect(() => {
    if (!props.match.params.id) return;
    getEntry(props.match.params.id).then(x => setEntry(x));
  }, [props.match.params.id, setEntry]);

  return (
    <>
      <Image src={entry && entry.image} />
      <Wrapper>{entry && <Entry {...entry} isExtend={true} />}</Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${media.greaterThan('medium')`
    margin: 0 auto;
    width: 90%;
    max-width: 980px;
  `}

  ${media.lessThan('medium')`
    width: 100%;
  `}
`;

const Image = styled.img`
  width: 100vw;
  height: calc(100vh - 64px);
  object-fit: cover;
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
`;
