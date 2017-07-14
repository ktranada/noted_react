import * as SessionAPI from '../util/session_api';
import { toggleModal } from './modal_actions';
import { addInvites } from './board_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_SESSION_ERRORS = "RECEIVE_USER_SESSION_ERRORS"
export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS';
export const UPDATE_TIME_ZONE = 'UPDATE_TIME_ZONE';

const parseSignInResponse = (promise, dispatch) => {
  return promise.then(
    response => {
      dispatch(receiveBoards(response.boards))
      return response;
    }, err => err.responseJSON)
       .then(
         response => dispatch(receiveCurrentUser(response.info)),
         err => err);
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
      error => error.responseJSON
    )
)

export const updateInvite = invite => dispatch => (
  SessionAPI.updateInvite(invite)
    .then(
      response => {
        if (response.boards) {
          dispatch(receiveBoards(response.boards));
        }
        return response;
      },
      err => err.responseJSON
    )
)

export const updateUser = (user, previousTimeZone) => dispatch => (
  SessionAPI.updateUser(user).then(
      (user) => {
        if (previousTimeZone !== undefined && user.timezone !== previousTimeZone) {
          dispatch(updateTimeZone());
        }
        dispatch(receiveCurrentUser(user));
        return user.timezone;
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

export const requestTimeZones = () => dispatch => (
  SessionAPI.requestTimeZones().then(
    timeZones => timeZones
  )
)

export const updateTimeZone = () => ({
  type: UPDATE_TIME_ZONE
})

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
