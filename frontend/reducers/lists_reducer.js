import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/board_toggler_actions';

const initialState = {
  byId: {}
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.lists);
    default:
      return state;
  }
}

export default listsReducer;
