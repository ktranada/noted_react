import 'babel-polyfill';

import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import {logout} from './actions/session_actions';


document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: {
        currentUser: window.currentUser.info,
        errors: []
      },
      boards: window.boards
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    delete window.boards;
  } else {
    store = configureStore();
  }
  window.logout = logout;
  window.store = store;
  ReactDOM.render(<Root store={store} />, rootEl);
});
