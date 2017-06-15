import merge from 'lodash/merge';
import { RECEIVE_BOARD_MEMBERS } from '../actions/board_nav_actions';

const initialState = {
  byId: {},
  order: []
}

const membersReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD_MEMBERS:
      return merge({}, initialState, action.members);
    default:
      return state;
  }
}

export default membersReducer;
