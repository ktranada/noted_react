import React from 'react';
import { connect } from 'react-redux';

import { signup, login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({session, boards}) => ({
  isLoggedIn: Boolean(session.currentUser),
  currentBoard: boards.currentBoard
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = formType === 'login' ? login : signup;
  return {
    processForm: user => dispatch(processForm(user)),
    formType
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
