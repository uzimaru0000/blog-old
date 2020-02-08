import * as React from 'react';
import ListContainer from '../../components/containers/List';
import { UseReducer, GetEntries, SetIsLoading } from '../store';


// propsを受けて、内部で状態を管理して、entriesの状態更新そのものはグローバルでやるのではなくて、コンポーネントで閉じれそう？
export default (props: UseReducer) => {
  const entries = Object.keys(props.state.entries).map(x => ({
    id: x,
    ...props.state.entries[x],
  }));

  // props.stateの状態監視はいらない？
  React.useEffect(() => {
    GetEntries(props.state.after).then(x => props.dispatcher(x));
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
          GetEntries(props.state.after).then(x => {
            props.dispatcher(x);
          });
        })
      }
    />
  );
};
