import merge from 'lodash/merge';
import { RECEIVE_USER_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions'

const nullUser = Object.freeze({
  currentUser: null,
  errors: []
});


const sessionReducer = (state = nullUser, action) => {
  Object.freeze(action);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
        return merge({}, nullUser, {
          currentUser: action.currentUser
        });
    case RECEIVE_USER_ERRORS:
        return merge({}, nullUser, {
          errors: action.errors
        })
    default:
      return state;
  }
}

export default sessionReducer;
