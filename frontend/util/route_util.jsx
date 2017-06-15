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

const Protected = ({component: Component, children, path, isLoggedIn}) => (
  <Route path={path} render={(props) => (
      isLoggedIn ?
        (<Component {...props} />) :
        (<Redirect to="/login" />)
  )} />
);

const ProtectedRedirect = ({ exact, to, path, isLoggedIn }) => (
  <Route push exact={exact} path={path} render={() => (
      isLoggedIn ?
        (<Redirect to={to}/>) :
        (<Redirect to="/login" />)
  )} />
)

const mapStateToProps = ({session}) => ({
  isLoggedIn: Boolean(session.currentUser)
});

export const AuthRoute = withRouter(
  connect(mapStateToProps, null)(Auth)
);

export const ProtectedRoute = connect(mapStateToProps, null)(Protected)

export const ProtectedRedirectRoute = connect(mapStateToProps, null)(ProtectedRedirect)
