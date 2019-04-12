
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './containers/Home';
import { SignUp } from './containers/Users/containers/SignUp';

export const RoutesWithoutHeader = (location) => {
  return (
    <Switch location={location}>
      <Route path='/' exact component={Home} />
      <Route path='/signup' component={SignUp} />
    </Switch>
  )
}

export const RoutesWithHeader = (location) => {
  return (
    <div>
      { RoutesWithoutHeader(location) }
    </div>
  )
}