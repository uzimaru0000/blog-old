import * as React from 'react';
import TopContainer from '../containers/Top';
import { UseReducer } from '../store';

export default (props: UseReducer) => {
  const entries = Object.keys(props.state).map(x => ({
    id: x,
    ...props.state[x],
  }));

  return <TopContainer entries={entries} />;
};
