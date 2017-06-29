import * as SessionAPI from '../util/session_api';
import { toggleModal } from './modal_actions';
import { addInvites } from './board_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_SESSION_ERRORS = "RECEIVE_USER_SESSION_ERRORS"
export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS';

const parseSignInResponse = (promise, dispatch) => {
  return promise.then(response => {
                dispatch(receiveBoards(response.boards))
                return response;
              }, err => err.responseJSON)
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
    .then(() => {
      dispatch(toggleModal(null));
      dispatch(receiveCurrentUser(null));
    })
)

export const getInvite = code => dispatch => (
  SessionAPI.getInvite(code)
    .then(
      invite => invite,
      error => console.log(error.responseJSON)
    )
)

export const updateInvite = invite => dispatch => (
  SessionAPI.updateInvite(invite)
    .then(
      response => response,
      err => err.responseJSON
    )
)

export const updateUser = user => dispatch => (
  SessionAPI.updateUser(user).then(
      (user) => {
        dispatch(receiveCurrentUser(user));
        return user;
      },
      errors => errors.responseJSON)
);

export const destroyUser = userId => dispatch => (
  SessionAPI.destroyUser(userId).then(
      () => {
        dispatch(toggleModal(null))
        dispatch(receiveCurrentUser(null))
  })
)

export const receiveBoards = boards => ({
  type: RECEIVE_BOARDS,
  boards
})

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_USER_SESSION_ERRORS,
  errors
});

export const receiveUserUpdateErrors = errors => ({
  type: RECEIVE_USER_UPDATE_ERRORS,
  errors
});
