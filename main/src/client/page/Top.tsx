import * as React from 'react';
import TopContainer from '../../components/containers/Top';
import { UseReducer, GetEntries } from '../store';

export default (props: UseReducer) => {
  const entries = Object.keys(props.state).map(x => ({
    id: x,
    ...props.state[x],
  }));

  React.useEffect(() => {
    GetEntries().then(x => props.dispatcher(x));
  }, []);

  return <TopContainer entries={entries} />;
};
