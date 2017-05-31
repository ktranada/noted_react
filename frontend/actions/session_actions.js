import * as SessionAPI from '../util/session_api'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => (dispatch) => {
  return SessionAPI.login(user)
    .dispatch(user => receiveCurrentUser(user),
              errors => receiveErrors(errors));
}
export const logout = () => dispatch => {
  return SessionAPI.logout()
    .dispatch(user => receiveCurrentUser(null),
              errors => receiveErrors(errors));
}
