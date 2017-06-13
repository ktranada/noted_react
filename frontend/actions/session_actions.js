import * as SessionAPI from '../util/session_api'
import { setCurrentBoardId, addBoards } from './board_toggler_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

const parseSignInResponse = (promise, dispatch) => {
  promise.then(response => {
                // dispatch(setCurrentBoardId(response.boards.currentBoardId));
                dispatch(addBoards(response.boards))
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
export const logout = () => dispatch => {
  return SessionAPI.logout()
    .then(() => dispatch(receiveCurrentUser(null)))
}
