import * as SessionAPI from '../util/session_api';
import { toggleModal } from './modal_actions';
import { addInvites } from './board_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_SESSION_ERRORS = "RECEIVE_USER_SESSION_ERRORS"
export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS';
export const START_UPDATING_TIMEZONE = 'START_UPDATING_TIMEZONE';
export const UPDATE_TIMEZONE = 'UPDATE_TIMEZONE';

export const requestInvite = code => dispatch => (
  SessionAPI.requestInvite(code)
    .then(
      invite => invite,
      error => error.responseJSON
    )
)

export const requestTimeZones = () => dispatch => (
  SessionAPI.requestTimeZones().then(
    timezones => timezones
  )
)

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

export const signup = user => dispatch => (
  parseSignInResponse(SessionAPI.signup(user), dispatch)
)

export const login = user => (dispatch) => (
   parseSignInResponse(SessionAPI.login(user), dispatch)
)

export const logout = () => dispatch => (
  SessionAPI.logout()
    .then(() => {
      dispatch(toggleModal(null));
      dispatch(receiveCurrentUser(null));
    })
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

export const updateUser = (user, previousTimeZone) => dispatch => {
  if (previousTimeZone !== undefined && user.timezone !== previousTimeZone) {
    dispatch(startUpdatingTimezone());
  }

  return SessionAPI.updateUser(user).then(
      (user) => {
        if (previousTimeZone !== undefined && user.timezone !== previousTimeZone) {
          dispatch(updateTimezone(user.timezone));
        } else {
          dispatch(receiveCurrentUser(user));
        }
        return user.timezone;
      },
      errors => errors.responseJSON)
}

export const destroyUser = userId => dispatch => (
  SessionAPI.destroyUser(userId).then(
      () => {
        dispatch(toggleModal(null))
        dispatch(receiveCurrentUser(null))
  })
)

export const startUpdatingTimezone = () => ({
  type: START_UPDATING_TIMEZONE
})

export const updateTimezone = (timezone) => ({
  type: UPDATE_TIMEZONE,
  timezone
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
