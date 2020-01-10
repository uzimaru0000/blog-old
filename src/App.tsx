import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Top from './page/Top';
import Detail from './page/Detail';
import NotFound from './page/NotFound';
import { BrowserRouter, Route } from 'react-router-dom';

export default () => (
  <BrowserRouter>
    <Header>にわとりになる日まで</Header>
    <Route exact path="/" component={Top} />
    <Route path="/entry/:id" component={Detail} />
    <Route component={NotFound} />
    <Footer />
  </BrowserRouter>
);
