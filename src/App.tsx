import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Top from './page/Top';
import Detail from './page/Detail';
import NotFound from './page/NotFound';
import { Route, Switch } from 'react-router-dom';
import createReducer from './store';

export default () => {
  const ReducerContext = createReducer();

  return (
    <ReducerContext.Consumer>
      {ctx => (
        <>
          <Header>にわとりになる日まで</Header>
          <Switch>
            <Route exact path="/" render={() => <Top {...ctx} />} />
            <Route
              path="/entry/:id"
              render={rProps => <Detail {...rProps} {...ctx} />}
            />
            <Route path="/*" component={NotFound} />
          </Switch>
          <Footer />
        </>
      )}
    </ReducerContext.Consumer>
  );
};
