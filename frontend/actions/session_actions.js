import * as SessionAPI from '../util/session_api'
import { receiveBoards } from './nav_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"



const parseSignInResponse = (promise, dispatch) => {
  promise.then(response => {
                dispatch(receiveBoards(response.boards))
                return response;
              }, err => dispatch(receiveErrors(err.responseJSON)))
         .then(response => dispatch(receiveCurrentUser(response.info)));
}

export const signup = user => dispatch => {
  return parseSignInResponse(SessionAPI.signup(user), dispatch)

}

export const login = user => (dispatch) => {
  return parseSignInResponse(SessionAPI.login(user), dispatch)
}
export const logout = () => dispatch => (
  SessionAPI.logout()
    .then(() => dispatch(receiveCurrentUser(null)))
)

export const updateUser = user => dispatch => (
  SessionAPI.updateUser(user).then(
      (user) => {
        dispatch(receiveCurrentUser(user));
        return user;
      },
      errors => dispatch(receiveErrors(errors)))
);


export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});
