import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import SessionFormContainer from '../components/session/session_form_container';

const Auth = ({ component: Component, path, isLoggedIn }) => (
  <Route path={path} render={(props) => (
    isLoggedIn ?
      (<Redirect to="/" />) :
      (<Component {...props} />)
  )} />
);

const Protected = ({component: Component, path, isLoggedIn}) => (
  <Route path={path} render={(props) => (
      isLoggedIn ?
        (<Component {...props} />) :
        (<Redirect to="/login" />)
  )} />
);

const mapStateToProps = ({session}) => ({
  isLoggedIn: Boolean(session.currentUser)
});

export const AuthRoute = withRouter(
  connect(mapStateToProps, null)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);
