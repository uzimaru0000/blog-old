import * as React from 'react';
import DetailContainer from '../../components/containers/Detail';
import { UseReducer } from '../store';
import { RouteComponentProps } from 'react-router-dom';

export default (props: RouteComponentProps<{ id: string }> & UseReducer) => {
  const id = props.match.params.id;
  const entry = { id, ...props.state.entries[id] };
  return <DetailContainer entry={entry} />;
};
