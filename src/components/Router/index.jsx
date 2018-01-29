import React from 'react';
import { Switch, Route } from 'react-router';
import { Module } from 'react-router-server';

const renderAsyncRoute = matchProps => module =>
  (module ? <module.default {...matchProps} /> : null);

const component = () => (
  <Route render={
    ({ location }) => (
      <Switch>
        <Route
          path="/"
          render={
            matchProps => (
              <Module module={() => import(/* webpackChunkName: 'Home' */ '../Home')}>
                {renderAsyncRoute(matchProps)}
              </Module>
            )
          }
          exact
        />
      </Switch>
    )}
  />
);

export default component;
