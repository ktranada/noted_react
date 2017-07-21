import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthRoute, ProtectedRoute, ProtectedRedirectRoute } from '../util/route_util';
import NotificationsActionCableContainer from './NotificationsActionCableContainer';
import SessionFormContainer from './session/session_form_container';
import InviteResponseFormContainer from './session/invite/InviteResponseFormContainer';
import LandingContainer from './LandingContainer';
import DashboardContainer from './DashboardContainer';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/invite/:code" component={InviteResponseFormContainer} />
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/boards">
          <div style={{width: '100%', height: '100%'}}>
            <NotificationsActionCableContainer />
            <Switch>
              <Route path="/boards/:boardId" component={DashboardContainer}/>
              <Route component={LandingContainer}/>
            </Switch>
          </div>

        </ProtectedRoute>
        <Redirect to="/boards" />
      </Switch>
    </div>
  )
}

export default App;
//
