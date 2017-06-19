import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, ProtectedRedirectRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Landing from './landing';
import BoardsContainer from './BoardsContainer';

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/boards">
          <Switch>
            <Route path="/boards/:boardId" component={BoardsContainer}/>
            <Route component={Landing}/>
          </Switch>
        </ProtectedRoute>
        <Redirect to="/boards" />
      </Switch>
    </div>
  )
}

export default App;
//
