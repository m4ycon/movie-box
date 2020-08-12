import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';

import './styles/global.scss';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Search} path="/movies" exact />
      </Switch>
    </BrowserRouter>
  );
};
