import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import  ActionCableProvider from './util/ActionCableProvider';
import App from './app';

const Root = ({ store }) => {
  const cableUrl = process.env.NODE_ENV !== 'production'
    ? 'ws://127.0.0.1:3000/cable'
    : process.env.WEB_SOCKET_SERVER_URL

  return  (
    <Provider store={store}>
      <ActionCableProvider url={cableUrl}>
        <HashRouter>
          <App />
        </HashRouter>
      </ActionCableProvider>
    </Provider>
  )
}

export default Root;
