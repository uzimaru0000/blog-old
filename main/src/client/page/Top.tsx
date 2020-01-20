import * as React from 'react';
import TopContainer from '../../components/containers/Top';
import { UseReducer, GetEntries, SetIsLoading } from '../store';

export default (props: UseReducer) => {
  const entries = Object.keys(props.state.entries).map(x => ({
    id: x,
    ...props.state.entries[x],
  }));

  React.useEffect(() => {
    GetEntries(props.state.after).then(x => props.dispatcher(x));
  }, []);

  return (
    <TopContainer
      entries={entries}
      isLoading={props.state.isLoading}
      onEnd={
        props.state.after &&
        !props.state.isLoading &&
        (() => {
          props.dispatcher(SetIsLoading());
          GetEntries(props.state.after).then(x => {
            props.dispatcher(x);
          });
        })
      }
    />
  );
};
