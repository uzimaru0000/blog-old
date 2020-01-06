import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Top from './page/Top';
import Detail from './page/Detail';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

export default () => (
  <BrowserRouter>
    <Header>にわとりになる日まで</Header>
    <Route exact path="/" component={Top} />
    <Route path="/entry/:id" component={Detail} />
    <Footer />
  </BrowserRouter>
);
