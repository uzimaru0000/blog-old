import * as React from 'react';
import ListContainer from '../components/containers/List';
import { NextPage } from 'next';
import useSWR from 'swr';
import { getEntries } from '../lib/api';
import { WithID, Entry, entryEncoder, entryWithID } from '../lib/model';
import EntryView from '../components/Entry';

const Top: NextPage<{ entries: WithID<Entry>[]; after?: number }> = (props) => {
  const [after, setAfter] = React.useState(props.after);

  const { data, mutate } = useSWR<{ entries: WithID<Entry>[]; after?: number }>(
    'get_entries',
    () => getEntries(after)
  );

  const entries: WithID<Entry>[] = [
    ...props.entries.map(entryWithID.runWithException),
    ...((data && data.entries) || []),
  ];

  const loadMore = React.useCallback(() => {
    if (!after) {
      return;
    }

    mutate(({ entries }: { entries: WithID<Entry>[]; after?: number }) =>
      getEntries(after).then((data) => ({
        ...data,
        entries: [...entries, ...data.entries],
      }))
    );
  }, [after, mutate]);

  React.useEffect(() => {
    if (!data) {
      return;
    }

    setAfter(data.after);
  }, [setAfter, data]);

  return (
    <ListContainer isLoading={!data} onEnd={loadMore}>
      {entries.map((entry) => (
        <EntryView key={entry.id} {...entry}></EntryView>
      ))}
    </ListContainer>
  );
};

export const getServerSideProps = async () => {
  const { entries, after } = await getEntries();

  return {
    props: {
      after,
      entries: entries.map(({ id, ...entry }) => ({
        id,
        ...entryEncoder(entry),
      })),
    },
  };
};

export default Top;
