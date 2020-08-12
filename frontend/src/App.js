import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/global.scss';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
};
