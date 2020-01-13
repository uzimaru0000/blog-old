import * as React from 'react';
import DetailContainer from '../containers/Detail';
import { UseReducer } from '../store';
import { RouteComponentProps } from 'react-router-dom';

export default (props: RouteComponentProps<{ id: string }> & UseReducer) => {
  const id = props.match.params.id;
  const entry = { id, ...props.state[id] };
  return <DetailContainer entry={entry} />;
};
