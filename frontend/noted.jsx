import React from "react";
import ReactDOM from "react-dom";
import merge from 'lodash/merge';
import configureStore from './store/store';
import Root from './components/root';
import {logout} from './actions/session_actions';
import {createBoard} from './actions/nav_actions';


window.addEventListener('load', () => {
  const rootEl = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: {
        currentUser: window.currentUser.info,
        errors: []
      },
      boards: window.boards.boards,
      loading: window.boards.loading
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    delete window.boards;
  } else {
    store = configureStore();
  }

  setTimeout(() => {
    document.getElementById('root-loader').outerHTML = "";
    document.getElementById('bootstrap-current-user').outerHTML = "";
    ReactDOM.render(<Root store={store} />, rootEl);
  }, 500);

});
