import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, ProtectedRedirectRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import InviteResponseFormContainer from './session/invite/InviteResponseFormContainer';
import LandingContainer from './LandingContainer';
import DashboardContainer from './DashboardContainer';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/invite/:code" component={InviteResponseFormContainer} />
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/boards">
          <Switch>
            <Route path="/boards/:boardId" component={DashboardContainer}/>
            <Route component={LandingContainer}/>
          </Switch>
        </ProtectedRoute>
        <Redirect to="/boards" />
      </Switch>
    </div>
  )
}

export default App;
//
