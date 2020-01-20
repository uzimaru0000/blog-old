import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Route, Switch } from 'react-router-dom';
import createReducer from './store';
import Top from './page/Top';
import Detail from './page/Detail';
import Tag from './page/Tag';

export default () => {
  const [state, dispatcher] = createReducer();

  return (
    <>
      <Header>にわとりになる日まで</Header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Top state={state} dispatcher={dispatcher} />}
        />
        <Route
          path="/entry/:id"
          render={rProps => (
            <Detail {...rProps} state={state} dispatcher={dispatcher} />
          )}
        />
        <Route
          path="/tag/:tag"
          render={rProps => (
            <Tag {...rProps} state={state} dispatcher={dispatcher} />
          )}
        />
      </Switch>
      <Footer />
    </>
  );
};
