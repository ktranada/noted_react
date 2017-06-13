import merge from 'lodash/merge';
import { RECEIVE_CONVERSATIONS } from '../actions/board_nav_actions';

const initialState = {
  byId: {},
  order: []
}

const conversationsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return merge({}, initialState, action.conversations);
    default:
      return state;
  }
}


export default conversationsReducer;
