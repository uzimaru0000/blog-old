import * as React from 'react';
import ListContainer from '../../components/containers/List';
import { UseReducer, GetEntriesWithTag, SetIsLoading } from '../store';
import { RouteComponentProps } from 'react-router-dom';

// propsを受けてentitiesを返して、propsの状態を監視して、entriesを更新するhooksを作ると良さそう
export default (props: RouteComponentProps<{ tag: string }> & UseReducer) => {
  const entries = Object.keys(props.state.entries)
    .map(x => ({
      id: x,
      ...props.state.entries[x],
    }))
    .filter(x => x.tags.some(t => t === props.match.params.tag));

  React.useEffect(() => {
    GetEntriesWithTag(props.match.params.tag, props.state.after).then(x =>
      props.dispatcher(x)
    );
  }, []);

  return (
    <ListContainer
      entries={entries}
      isLoading={props.state.isLoading}
      onEnd={
        props.state.after &&
        !props.state.isLoading &&
        (() => {
          props.dispatcher(SetIsLoading());
          GetEntriesWithTag(props.match.params.tag, props.state.after).then(
            x => {
              props.dispatcher(x);
            }
          );
        })
      }
    />
  );
};
