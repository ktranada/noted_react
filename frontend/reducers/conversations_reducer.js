import merge from 'lodash/merge';
import { RECEIVE_CONVERSATIONS } from '../actions/board_navigation_actions';

const initialState = {
  byId: {},
  order: []
}

const conversationsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return merge({}, state, action.conversations);
    default:
      return state;
  }
}


export default conversationsReducer;
