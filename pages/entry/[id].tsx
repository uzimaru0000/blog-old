import * as React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import DetailContainer from '../../components/containers/Detail';
import { WithID, Entry, entryEncoder, entryWithID } from '../../lib/model';
import { getEntry } from '../../lib/api';

const Detail: NextPage<WithID<Entry>> = (props: WithID<Entry>) => (
  <DetailContainer entry={entryWithID.runWithException(props)} />
);

type EncodedEntry = Omit<WithID<Entry>, 'date'> & {
  date: number;
};

export const getServerSideProps: GetServerSideProps<
  EncodedEntry,
  { id: string }
> = async (ctx) => {
  const { id } = ctx.params;
  const entry = await getEntry(id).then((x) => ({
    id: x.id,
    ...entryEncoder(x),
  }));

  return { props: entry };
};

export default Detail;
