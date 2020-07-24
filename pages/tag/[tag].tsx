import * as React from 'react';
import ListContainer from '../../components/containers/List';
import { GetServerSideProps, NextPage } from 'next';
import { WithID, Entry, entryWithID, entryEncoder } from '../../lib/model';
import useSWR from 'swr';
import { getEntriesWithTag } from '../../lib/api';
import EntryView from '../../components/Entry';

type EncodedEntry = Omit<WithID<Entry>, 'date'> & { date: number };

type Props = { entries: EncodedEntry[]; after?: number; tag: string };

const TagList: NextPage<Props> = (props) => {
  const [after, setAfter] = React.useState(props.after);

  const { data, mutate } = useSWR<{ entries: WithID<Entry>[]; after?: number }>(
    `tag_${props.tag}`,
    () =>
      after
        ? getEntriesWithTag(props.tag, after)
        : Promise.resolve({ entries: [] })
  );

  const entries = [
    ...props.entries.map(entryWithID.runWithException),
    ...((data && data.entries) || []),
  ];

  const loadMore = React.useCallback(() => {
    if (!after) {
      return;
    }

    mutate(async ({ entries }) => {
      const data = await getEntriesWithTag(props.tag, after);

      return {
        ...data,
        entries: [...entries, ...data.entries],
      };
    });
  }, [after, mutate]);

  React.useEffect(() => {
    if (!data) {
      return;
    }

    setAfter(data.after);
  }, [data, setAfter]);

  return (
    <ListContainer isLoading={data ? false : true} onEnd={loadMore}>
      {entries.map((entry) => (
        <EntryView key={entry.id} {...entry}></EntryView>
      ))}
    </ListContainer>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { tag: string }
> = async (ctx) => {
  const { tag } = ctx.params;
  const { after, entries } = await getEntriesWithTag(tag);

  return {
    props: {
      tag,
      after: after || null,
      entries: entries.map((x) => ({ id: x.id, ...entryEncoder(x) })),
    },
  };
};

export default TagList;
