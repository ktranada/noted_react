import merge from 'lodash/merge';
import { RECEIVE_USER_SESSION_ERRORS, RECEIVE_CURRENT_USER, UPDATE_TIMEZONE } from '../actions/session_actions'

const nullUser = {
  currentUser: null,
  errors: {
    email: [],
    password: []
  }
}


const sessionReducer = (state = nullUser, action) => {
  Object.freeze(action);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
        return merge({}, nullUser, {
          currentUser: action.currentUser
        });
    case RECEIVE_USER_SESSION_ERRORS:
        return merge({}, nullUser, {
          errors: action.errors
        });
    case UPDATE_TIMEZONE:
      if (state.currentUser) {
        return merge({}, state, {
          currentUser: { timezone: action.timezone }
        })
      }
    default:
      return state;
  }
}

export default sessionReducer;
