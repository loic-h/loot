import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/app';

const store = createStore();

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDom.render(<AppContainer />, document.getElementById('app-container'));
