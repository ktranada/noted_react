import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, ProtectedRedirectRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Landing from './landing';

const App = (props) => {
  return (
    <div>
      <Switch>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/boards" component={Landing} />
        <ProtectedRedirectRoute path="/" to="/boards" />
      </Switch>
    </div>
  )
}


export default App;
