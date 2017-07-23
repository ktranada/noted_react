import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import  ActionCableProvider from './util/ActionCableProvider';
import { AuthRoute, ProtectedRoute, ProtectedRedirectRoute } from '../util/route_util';
import NotificationsActionCableContainer from './NotificationsActionCableContainer';
import SessionFormContainer from './session/session_form_container';
import InviteResponseFormContainer from './session/invite/InviteResponseFormContainer';
import LandingContainer from './LandingContainer';
import DashboardContainer from './DashboardContainer';

const cableUrl = process.env.NODE_ENV !== 'production'
  ? 'ws://127.0.0.1:3000/cable'
  : process.env.WEB_SOCKET_SERVER_URL

const App = () => (
  <div>
    <Switch>
      <Route exact path="/invite/:code" component={InviteResponseFormContainer} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectedRoute path="/boards">
        <ActionCableProvider url={cableUrl}>
          <div style={{width: '100%', height: '100%'}}>
            <NotificationsActionCableContainer />
            <Switch>
              <Route path="/boards/:boardId" component={DashboardContainer}/>
              <Route component={LandingContainer}/>
            </Switch>
          </div>
        </ActionCableProvider>
      </ProtectedRoute>
      <Redirect to="/boards" />
    </Switch>
  </div>
)

export default App;
//
