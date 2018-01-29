import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { preload } from 'react-router-server';
import { AppContainer } from 'react-hot-loader';

import Router from './components/Router';

const initialModules = global.__INITIAL_MODULES__ || [];

const render = (Component) => hydrate(
  <AppContainer>
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('main'),
);

preload(initialModules).then(() => render(Router));

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/Router', () => {
    render(Router);
  });
}
