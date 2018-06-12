import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './store';
import App from './components/app';

const store = createStore();

const AppContainer = () => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

render(<AppContainer />, document.getElementById('app-container'));
